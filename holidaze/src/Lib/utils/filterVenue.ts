import { Venue, Booking, SearchVenueParams } from "@/Lib/types/venue";

/**
 * * Filter venues based on search parameters
 */
export function filterVenues(
  venues: (Venue & { bookings?: Booking[] })[],
  params: SearchVenueParams
): Venue[] {
  //match location
  const city = params.city?.toLowerCase().trim();
  const country = params.country?.toLowerCase().trim();
  return venues.filter((venue) => {
    const venueCity = venue.location?.city?.toLowerCase().trim() || "";
    const venueCountry = venue.location?.country?.toLowerCase().trim() || "";

    const matchesCity = city ? venueCity.includes(city) : true;
    const matchesCountry = country ? venueCountry.includes(country) : true;
    const matchesLocation = matchesCity || matchesCountry;
    // console.log(
    //   "matchesLocation",
    //   matchesLocation,
    //   "city",
    //   matchesCity,
    //   "country",
    //   matchesCountry
    // );

    //match guests
    const matchesGuests = params.maxGuests
      ? venue.maxGuests >= params.maxGuests
      : true;
    // console.log(
    //   "matchesGuests",
    //   matchesGuests,
    //   "maxGuests",
    //   params.maxGuests,
    //   "venueMaxGuests",
    //   venue.maxGuests
    // );

    // match date range
    const isAvailable =
      params.dateFrom && params.dateTo
        ? (venue.bookings?.every((booking) => {
            const bookingFrom = new Date(booking.dateFrom);
            const bookingTo = new Date(booking.dateTo);
            const from = new Date(params.dateFrom!);
            const to = new Date(params.dateTo!);

            return to <= bookingFrom || from >= bookingTo;
          }) ?? true)
        : true;
    return matchesLocation && matchesGuests && isAvailable;
  });
}
