import { z } from "zod";

/**
 * Zod schema for search validation
 * - Location is required
 * - Check-in date is required
 * - Check-out date is required
 * - Guests must be at least 1
 */
export const searchSchema = z
  .object({
    city: z.string().min(1, "Location is required"),
    country: z.string().min(1, "Location is required"),

    checkIn: z
      .date({
        required_error: "Check-in date is required",
        invalid_type_error: "Invalid date format",
      })
      .refine((date) => date > new Date(), {
        message: "Check-in must be in the future",
      }),

    checkOut: z
      .date({
        required_error: "Check-out date is required",
        invalid_type_error: "Invalid date format",
      })
      .refine((date) => date > new Date(), {
        message: "Check-out must be in the future",
      }),

    guests: z
      .number({
        required_error: "Guests are required",
        invalid_type_error: "Guests must be a number",
      })
      .min(1, "At least one guest is required"),
  })
  .refine((data) => data.checkOut > data.checkIn, {
    message: "Check-out must be after check-in",
    path: ["checkOut"], // attach this error to the checkOut field
  });

export type SearchSchema = z.infer<typeof searchSchema>;
