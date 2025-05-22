import { Venue, Booking, SearchVenueParams } from "@/Lib/types/venue";

/**
 * Filter venues based on location, guests, and availability.
 */
// export function filterVenues(
//   venues: (Venue & { bookings?: Booking[] })[],
//   params?: SearchVenueParams // Mark params optional to avoid crashes
// ): Venue[] {
//   // Fallback in case params is undefined
//   const city = params?.city?.toLowerCase().trim() || "";
//   const country = params?.country?.toLowerCase().trim() || "";
//   const maxGuests = params?.maxGuests;
//   const dateFrom = params?.dateFrom;
//   const dateTo = params?.dateTo;

//   return venues.filter((venue) => {
//     // Normalize venue location
//     const venueCity = venue.location?.city?.toLowerCase().trim() || "";
//     const venueCountry = venue.location?.country?.toLowerCase().trim() || "";

//     // Location match (match city OR country)
//     const matchesCity = city ? venueCity.includes(city) : true;
//     const matchesCountry = country ? venueCountry.includes(country) : true;
//     const matchesLocation = matchesCity || matchesCountry;


//     // Guest count match
//     const matchesGuests = maxGuests ? venue.maxGuests >= maxGuests : true;

//     // Date availability
//     const isAvailable =
//       dateFrom && dateTo
//         ? (venue.bookings?.every((booking) => {
//             const bookingFrom = new Date(booking.dateFrom);
//             const bookingTo = new Date(booking.dateTo);
//             const from = new Date(dateFrom);
//             const to = new Date(dateTo);

//             return to <= bookingFrom || from >= bookingTo;
//           }) ?? true)
//         : true;

//     const passes = matchesLocation && matchesGuests && isAvailable;

//     return passes;
//   });
// }

export function filterVenues(
  venues: (Venue & { bookings?: Booking[] })[],
  params?: SearchVenueParams
): Venue[] {
  const locationKeyword = (params?.city || params?.country || "").toLowerCase().trim();
  const maxGuests = params?.maxGuests;
  const dateFrom = params?.dateFrom;
  const dateTo = params?.dateTo;

  return venues.filter((venue) => {
    const venueCity = venue.location?.city?.toLowerCase().trim() || "";
    const venueCountry = venue.location?.country?.toLowerCase().trim() || "";

    // ✅ Loose match: check if locationKeyword is in either city or country
    const matchesLocation = locationKeyword
      ? venueCity.includes(locationKeyword) || venueCountry.includes(locationKeyword)
      : true;

    const matchesGuests = maxGuests ? venue.maxGuests >= maxGuests : true;

    const isAvailable =
      dateFrom && dateTo
        ? (venue.bookings?.every((booking) => {
            const bookingFrom = new Date(booking.dateFrom);
            const bookingTo = new Date(booking.dateTo);
            const from = new Date(dateFrom);
            const to = new Date(dateTo);
            return to <= bookingFrom || from >= bookingTo;
          }) ?? true)
        : true;

    return matchesLocation && matchesGuests && isAvailable;
  });
}
