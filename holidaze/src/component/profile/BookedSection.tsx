"use client";
import { useAuth } from "@/hooks/useAuth";
import { useBookingByUser } from "@/hooks/useBookingByUser";
import VenueList from "../venues/VenueList";
import PageLoader from "../ui/PageLoader";
import { VenueFromBooking } from "@/Lib/types/venue";
import { useSearchParams } from "next/navigation";


/**
 * BookedSection component displays the venues that the current user has booked.
 * It separates them into upcoming and previous bookings based on `dateFrom`.
 *
 * Bookings are fetched from the API using the logged-in user's name.
 * Venues are extracted from the bookings and passed to the VenueList component.
 */
export default function BookedSection() {
  const { user} = useAuth();
  console.log('user in booked section', user);
  const username = user?.name || "";
  const { data: bookings, isLoading, isError } = useBookingByUser(username, true);
  const searchParams = useSearchParams();
  const showPastOnly = searchParams.get("tab") === "past";

 

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
    <section className="space-y-12">
      {!showPastOnly && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Upcoming Bookings</h2>
          {upcomingVenues.length > 0 ? (
            <VenueList venues={upcomingVenues} loading={false} />
          ) : (
            <p className="text-gray-500">You have no upcoming bookings.</p>
          )}
        </div>
      )}

      {/* Always show previous if tab=past */}
      {showPastOnly && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Previous Bookings</h2>
          {previousVenues.length > 0 ? (
            <VenueList venues={previousVenues} loading={false} />
          ) : (
            <p className="text-gray-500">You have no past bookings.</p>
          )}
        </div>
      )}
    </section>
  );
}
