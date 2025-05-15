import { VenueFromBooking } from "@/Lib/validation/venueSchema";

export function formatVenueData(data: VenueFromBooking) {
  return {
    name: data.name,
    description: data.description,
    price: data.price,
    maxGuests: data.maxGuests,

    media: (data.media ?? []).map((url) => ({
      url,
      alt: `${data.name} image`,
    })),

    location: {
      address: data.location.address,
      country: data.location.country,
    },

    meta: {
      wifi: data.amenities?.wifi ?? false,
      parking: data.amenities?.parking ?? false,
      breakfast: data.amenities?.breakfast ?? false,
      pets: data.amenities?.pets ?? false,
    },
  };
}
