import { Venue, Booking, SearchVenueParams } from "@/Lib/types/venue";
/**
 * Filters venues based on search parameters
 * @param venues - Array of venues to filter
 * @param params - Search parameters including city, maxGuests, dateFrom, and dateTo
 */

export function filterVenues(
  venues: (Venue & { bookings?: Booking[] })[],
  params?: SearchVenueParams
): Venue[] {
  const keyword = params?.city?.toLowerCase().trim() || "";
  const maxGuests = params?.maxGuests;
  const dateFrom = params?.dateFrom;
  const dateTo = params?.dateTo;

  return venues.filter((venue) => {
    const venueCity = (venue.location?.city || "").toLowerCase();
    const venueCountry = (venue.location?.country || "").toLowerCase();

    const matchesLocation =
      keyword === "" ||
      venueCity.includes(keyword) ||
      venueCountry.includes(keyword);

    const matchesGuests = maxGuests ? venue.maxGuests >= maxGuests : true;

    function datesOverlap(
      startA: Date,
      endA: Date,
      startB: Date,
      endB: Date
    ): boolean {
      return startA < endB && startB < endA;
    }

    const isAvailable =
      dateFrom && dateTo
        ? (venue.bookings?.every((booking) => {
            const bookingFrom = new Date(booking.dateFrom);
            const bookingTo = new Date(booking.dateTo);
            const from = new Date(dateFrom);
            const to = new Date(dateTo);

            return !datesOverlap(from, to, bookingFrom, bookingTo);
          }) ?? true)
        : true;

    const passes = matchesLocation && matchesGuests && isAvailable;

    return passes;
  });
}
