import { z } from "zod";

export const venueSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  description: z.string().min(10, "Description is required"),
  media: z.array(z.string().url()).optional(),
  maxGuests: z.number().min(1),
  price: z.number().min(1),
  rating: z.number().optional(),
  amenities: z.object({
    wifi: z.boolean().optional(),
    breakfast: z.boolean().optional(),
    parking: z.boolean().optional(),
    pets: z.boolean().optional(),
  }),
  location: z.object({
    address: z.string().optional(),
    city: z.string().optional(),
    country: z.string().optional(),
  }),
});
export type VenueFromBooking= z.infer<typeof venueSchema>;
