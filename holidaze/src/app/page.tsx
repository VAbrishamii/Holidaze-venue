"use client";
import { useState } from "react";
import VenueSearchForm from "@/component/search/VenueSearch";
import VenueList from "@/component/venues/VenueList";


export default function HomePage() {
  const [hasSearched, setHasSearched] = useState(false);
  return (
    <main className="px-6 py-10 max-w-7xl mx-auto">
     
     <VenueSearchForm onSearch={() => setHasSearched(true)} />
     {!hasSearched && <VenueList />}
    </main>
  );
}
