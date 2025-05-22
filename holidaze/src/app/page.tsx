"use client";
import React, { useState } from "react";
import VenueSearchForm from "@/component/search/VenueSearch";
import CompactSearchBar from "@/component/search/CompactSearchBar";
import SearchModal from "@/component/search/SearchModal";
import VenueList from "@/component/venues/VenueList";
import { useMutation } from "@tanstack/react-query";
import { searchVenues } from "@/Lib/api/venue";
import { SearchVenueParams } from "@/Lib/types/venue";
import { useSearchStore } from "@/hooks/useSearchStore";
/**
 * HomePage component
 *   - Displays a search bar for venues
 *   - Handles search functionality
 *   - Displays search results
 *   - Uses react-query for data fetching and state management
 *  - Uses a modal for compact search on small screens
 *   - Uses a full form for desktop
 *   - Uses a loading state for search results
 *   - Uses a toast notification for error handling
 */

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const { results, status, setResults, setStatus } = useSearchStore();

  const { mutate } = useMutation({
    mutationFn: searchVenues,
    onMutate: () => setStatus("pending"),
    onSuccess: (venues) => {
      setResults(venues.length ? venues : []);
      setStatus("success");
      setModalOpen(false);
    },
    onError: () => {
      setResults([]);
      setStatus("error");
      setModalOpen(false);
    },
  });

  const handleSearch = (params: SearchVenueParams) => {
    mutate(params);
  };

  return (
    <div className="px-6 py-10 max-w-7xl mx-auto">
      {/* Compact search for small screens */}
      <div className="block md:hidden">
        <CompactSearchBar onClick={() => setModalOpen(true)} />
        <SearchModal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
          <VenueSearchForm onSearch={handleSearch} />
        </SearchModal>
      </div>

      {/* Full form for desktop */}
      <div className="hidden md:block">
        <VenueSearchForm onSearch={handleSearch} />
      </div>

      {/* Venue Results */}
      <VenueList venues={results ?? undefined} loading={status === "pending"} />
    </div>
  );
}
