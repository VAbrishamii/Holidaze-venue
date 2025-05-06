"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllVenues } from "@/Lib/api/venue";
import VenueCard from "./VenueCard";
import { Venue } from "@/Lib/types/venue";
import PageLoader from "../ui/PageLoader";
import LoadMoreButton from "../ui/LoadMoreButton";

const PAGE_LIMIT = 12;

interface VenueListProps {
  venues?: Venue[]; // optional: when passed, render filtered
  loading?: boolean; // optional: show loading for search results
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
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.meta?.nextPage,
    enabled: !venues, // only run infinite query if not searching
  });

  // const displayVenues = venues || data?.pages.flatMap((page) => page.data) || [];

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
  // const displayVenues =
  //   venues ?? data?.pages.flatMap((page) => page.data) ?? [];
  // const displayVenues = venues ? venues : data?.pages.flatMap((page) => page.data) ?? [];
  const displayVenues = Array.from(new Map(
    (venues ? venues : data?.pages.flatMap((p) => p.data) ?? [])
      .map((v) => [v.id, v])
  ).values());
  

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
