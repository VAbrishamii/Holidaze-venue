import React from "react";
import { Venue } from "@/Lib/types/venue";
import VenueCard from "@/component/venues/VenueCard";
import PageLoader from "../ui/PageLoader";

interface SearchResultsProps {
  venues: Venue[] | undefined;
  status: "idle" | "pending" | "success" | "error";
  isError: boolean;
  loading: boolean;
}

/**
 * SearchResults component to display search results from VenueSearchForm
 * Handles 4 cases: loading, error, success with results, and success with no results
 */
const SearchResults: React.FC<SearchResultsProps> = ({
  venues,
  status,
  isError,
}) => {
  if (status === "pending") {
    return <PageLoader />;
  }

  if (isError) {
    return (
      <p className="text-center text-red-500 mt-6">
        Something went wrong. Please try again.
      </p>
    );
  }

  if (venues && venues.length > 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {venues.map((venue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </div>
    );
  }

  if (venues && venues.length === 0 && status === "success") {
    return (
      <p className="text-center text-gray-500 mt-6">
        No venues match your search.
      </p>
    );
  }

  return null; // fallback for initial state or unknown edge case
};

export default SearchResults;
