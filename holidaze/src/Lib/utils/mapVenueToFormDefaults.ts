
import { VenueDetails } from "@/Lib/types/venue";
import { VenueFromBooking } from "@/Lib/validation/venueSchema";

/**
 * Maps a venue API response into the default form values structure.
 */
export function mapVenueToFormDefaults(data: VenueDetails): VenueFromBooking {
  return {
    id: data.id,
    name: data.name,
    description: data.description,
    price: data.price,
    maxGuests: data.maxGuests,
    media: data.media ? data.media.map((m) => typeof m === "string" ? m : m.url) : [],
    location: {
      country: data.location?.country || "",
      address: data.location?.address || "",
    },
    amenities: {
      wifi: data.meta?.wifi ?? false,
      parking: data.meta?.parking ?? false,
      breakfast: data.meta?.breakfast ?? false,
      pets: data.meta?.pets ?? false,
    },
    rating: data.rating,
  };
}

