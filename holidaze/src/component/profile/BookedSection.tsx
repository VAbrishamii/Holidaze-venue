"use client";
import { useAuth } from "@/hooks/useAuth";
import { useBookingsByUser } from "@/hooks/useBookingByUser";
import VenueList from "../venues/VenueList";
import PageLoader from "../ui/PageLoader";
import { VenueFromBooking } from "@/Lib/types/venue";

/**
 * BookedSection component displays the venues that the current user has booked.
 * It separates them into upcoming and previous bookings based on `dateFrom`.
 *
 * Bookings are fetched from the API using the logged-in user's name.
 * Venues are extracted from the bookings and passed to the VenueList component.
 */
export default function BookedSection() {
  const { user } = useAuth();
  const username = user?.name || "";
  const { data: bookings, isLoading, isError } = useBookingsByUser(username);
  //show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <PageLoader />
      </div>
    );
  }
  //show error state
  if (isError || !bookings) {
    return (
      <p className="text-center text-red-500">Could not load your bookings.</p>
    );
  }

  const now = new Date();
  /**
   * Filters bookings to find those that start in the future
   * Then extracts their venue data
   */

  const upcomingVenues: VenueFromBooking[] = bookings
    .filter((b) => new Date(b.dateFrom) > now && !!b.venue)
    .map((b) => b.venue as VenueFromBooking);

  /**
   * Filters bookings to find those that are in the past or today
   * Then extracts their venue data
   */
  const previousVenues: VenueFromBooking[] = bookings
    .filter((b) => new Date(b.dateFrom) <= now && !!b.venue)
    .map((b) => b.venue as VenueFromBooking);

  return (
    <section className="mt-8 space-y-12">
        {/* Upcoming Bookings Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4"> Upcoming Bookings</h2>
        {upcomingVenues.length > 0 ? (
          <VenueList venues={upcomingVenues} loading={false} />
        ) : (
          <p className="text-gray-500">You have no upcoming bookings.</p>
        )}
      </div>

      {/* Previous Bookings Section (only if exists) */}
      {previousVenues.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">📚 Previous Bookings</h2>
          <VenueList venues={previousVenues} loading={false} />
        </div>
      )}
    </section>
  );
}
