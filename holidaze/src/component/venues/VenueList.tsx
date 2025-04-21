"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllVenues } from "@/Lib/api/venue";
import VenueCard from "./VenueCrad";
import PageLoader from "../ui/PageLoader";
import LoadMoreButton from "../ui/LoadMoreButton";

const PAGE_LIMIT = 12;
/**
 
 * * Client component for the venue list page.
 */

export default function VenueList() {
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
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.meta?.nextPage,
  });

  if (isLoading)
    return (
      <div className="flex justify-center p-6">
        <PageLoader />
      </div>
    );

  if (isError)
    return (
      <p className="text-center text-red-500">
        Error: {(error as Error).message}
      </p>
    );

  const venues = data?.pages.flatMap((page) => page.data) || [];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {venues.map((venue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </div>

      {hasNextPage && (
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
