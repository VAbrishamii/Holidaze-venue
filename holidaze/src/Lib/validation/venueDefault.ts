

import { VenueFromBooking } from "@/Lib/validation/venueSchema";

export const defaultVenueValues: VenueFromBooking = {
  name: "",
  description: "",
  price: 0,
  maxGuests: 1,
  location: {
    country: "",
    address: "",
  },
  amenities: {
    wifi: false,
    breakfast: false,
    parking: false,
    pets: false,
  },
  media: [],
};
