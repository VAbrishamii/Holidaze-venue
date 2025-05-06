"use client";
import { useState } from "react";
import VenueSearchForm from "@/component/search/VenueSearch";
import VenueList from "@/component/venues/VenueList";
import CompactSearchBar from "@/component/search/CompactSearchBar";
import SearchModal from "@/component/search/SearchModal";


export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  return (
    <main className="px-6 py-10 max-w-7xl mx-auto">
      <CompactSearchBar onClick={() => setIsModalOpen(true)} />
     <div className="hidden md:block">

     <VenueSearchForm onSearch={() => setHasSearched(true)} />
      </div>
     {!hasSearched && <VenueList />}
     <SearchModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}
