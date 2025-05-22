"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllVenues } from "@/Lib/api/venue";
import VenueCard from "./VenueCard";
import { Venue, VenueFromBooking } from "@/Lib/types/venue";
import PageLoader from "../ui/PageLoader";
import LoadMoreButton from "../ui/LoadMoreButton";

const PAGE_LIMIT = 12;
/**
 * A component that displays a list of venues.
 * It can either take a list of venues as props or fetch them from the API.
 * It also handles loading and error states.
 */
interface VenueListProps {
  venues?: (Venue | VenueFromBooking)[];
  loading?: boolean;
}


export default function VenueList({ venues, loading }: VenueListProps) {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
  } = useInfiniteQuery({
    queryKey: ["venues"],
    queryFn: ({ pageParam = 1 }) =>
      getAllVenues({
        page: pageParam,
        limit: PAGE_LIMIT,
        _bookings: true,
        _owner: true,
        sort: "created",
        sortOrder: "desc",
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.meta?.nextPage,
    enabled: !venues,
    staleTime: 0,
    refetchOnMount: "always",
  });

  if (loading || (isLoading && !venues)) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <PageLoader />
      </div>
    );
  }

  if (isError && !venues) {
    return (
      <p className="text-center text-red-500">
        Error: {(error as Error).message}
      </p>
    );
  }
  const flatVenues = venues ?? data?.pages.flatMap((p) => p.data) ?? [];
  const displayVenues = Array.from(
    new Map(flatVenues.map((v) => [v.id, v])).values()
  );

  // Show fallback if no venues are available
  if (displayVenues.length === 0) {
    return <p className="text-center text-gray-500 mt-8">No venues found.</p>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {displayVenues.map((venue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </div>

      {!venues && hasNextPage && (
        <div className="text-center">
          <LoadMoreButton
            isLoading={isFetchingNextPage}
            onClick={() => fetchNextPage()}
          />
        </div>
      )}
    </div>
  );
}
