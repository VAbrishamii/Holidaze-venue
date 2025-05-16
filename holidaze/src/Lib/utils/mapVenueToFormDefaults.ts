
// import { VenueDetails } from "@/Lib/types/venue";
// import { VenueFromBooking } from "@/Lib/validation/venueSchema";

// /**
//  * Converts VenueDetails to a shape matching VenueFromBooking for form use.
//  */
// export function mapVenueToFormDefaults(venue: VenueDetails): VenueFromBooking {
//   return {
//     id: venue.id,
//     name: venue.name,
//     description: venue.description,
//     price: venue.price,
//     maxGuests: venue.maxGuests,
//     location: {
//       address: venue.location?.address || "",
//       country: venue.location?.country || "",
//     },
//     media: venue.media ? venue.media.map((m) => typeof m === "string" ? m : m.url) : [],
//     meta: {
//       wifi: venue.meta?.wifi ?? false,
//       parking: venue.meta?.parking ?? false,
//       breakfast: venue.meta?.breakfast ?? false,
//       pets: venue.meta?.pets ?? false,
//     },
//     rating: venue.rating,
//     owner: venue.owner,
//     customer: {
//       name: "",
//       email: "",
//     },
//   };
// }
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

