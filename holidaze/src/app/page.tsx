"use client";
import React, { useState } from "react";
import VenueSearchForm from "@/component/search/VenueSearch";
import CompactSearchBar from "@/component/search/CompactSearchBar";
import SearchModal from "@/component/search/SearchModal";
import VenueList from "@/component/venues/VenueList";
import { useMutation } from "@tanstack/react-query";
import { searchVenues } from "@/Lib/api/venue";
import { SearchVenueParams, Venue } from "@/Lib/types/venue";

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<Venue[] | null>(null);

  const { mutate, status } = useMutation({
    mutationFn: searchVenues,
    onSuccess: (results) => {
      setSearchResults(results.length ? results : []); // set search results or undefined if empty
      setModalOpen(false); // close modal after search
    },
    onError: () => {
      setSearchResults([]); // reset search results on error
      setModalOpen(false); // close modal on error
    },
  });

  const handleSearch = (params: SearchVenueParams) => {
    mutate(params);
  };

  return (
    <div className="px-6 py-10 max-w-7xl mx-auto">
      {/*  Compact search for small screens */}
      <div className="block md:hidden">
        <CompactSearchBar onClick={() => setModalOpen(true)} />

        <SearchModal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
          <VenueSearchForm onSearch={handleSearch} />
        </SearchModal>
      </div>

      {/*  Full form for desktop */}

      <div className="hidden md:block">
        <VenueSearchForm onSearch={handleSearch} />
      </div>

      {/*  Search results */}
      <VenueList
        venues={searchResults ?? undefined}
        loading={status === "pending"}
      />
    </div>
  );
}
