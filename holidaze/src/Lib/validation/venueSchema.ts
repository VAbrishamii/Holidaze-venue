import { z } from "zod";

export const venueSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(10, "Description is required"),
  media: z.array(z.string().url()).nonempty(),
  maxGuests: z.number().min(1),
  price: z.number().min(1),
  rating: z.number().optional(),
  amenities: z.object({
    wifi: z.boolean(),
    breakfast: z.boolean(),
    parking: z.boolean(),
    pets: z.boolean(),
  }),
  location: z.object({
    address: z.string(),
    city: z.string(),
    country: z.string(),
  }),
});
export type Venue = z.infer<typeof venueSchema>;
