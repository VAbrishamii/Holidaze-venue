"use client";
import React, { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { useVenueSearchForm } from "@/hooks/useVenueSearchForm";
import { searchVenues } from "@/Lib/api/venue";
import { SearchVenueParams, Venue } from "@/Lib/types/venue";

import LocationInput from "./LocationInput";
import DateRangeSelector from "./DateRangeSelector";
import GuestInput from "./GuestInput";
import SearchButton from "./SearchButton";
import VenueCard from "@/component/venues/VenueCard";
import PageLoader from "@/component/ui/PageLoader";
import { SearchSchema } from "@/Lib/validation/searchSchema";
/**
  * VenueSearchForm component for searching venues
  * - Uses react-hook-form for form management
  * - Uses react-query for data fetching and mutation
  * - Displays a date range selector and guest input
  * - Handles form submission and error states 
  * - Displays search results or error messages
  * - Uses custom hooks for form management and validation
  * - Uses custom components for location input, date range selector, and guest input
  * - Uses react-hot-toast for notifications
  * 
 */
const VenueSearchForm: React.FC = () => {
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useVenueSearchForm();

  const mutation = useMutation<Venue[], Error, SearchVenueParams>({
    mutationFn: searchVenues,
  });

  const { mutate, data: venues, status, isError } = mutation;

  const onSubmit = (data: SearchSchema) => {
    const [city, country] = data.location.split(",").map((p) => p.trim());
    mutate({
      city,
      country: city && country ? country : city,
      maxGuests: data.guests,
      dateFrom: data.checkIn.toISOString(),
      dateTo: data.checkOut.toISOString(),
    });
  };

  const location = watch("location");
  const guests = watch("guests");
  const dateRange = {
    from: watch("checkIn")?.toISOString(),
    to: watch("checkOut")?.toISOString(),
  };

  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setShowCalendar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative bg-white shadow-lg p-4 m-4 border rounded-full flex flex-wrap gap-4 items-center justify-center w-full max-w-4xl mx-auto">
        <LocationInput
          value={location}
          onChange={(val) => setValue("location", val)}
        />
        <div className="border-l h-10 mx-4" />
        <div className="flex flex-col mr-4">
          <label className="text-sm font-semibold">Dates</label>
          <button
            type="button"
            className="text-left text-gray-500 text-sm outline-none min-w-[140px]"
            onClick={() => setShowCalendar((prev) => !prev)}>
            {dateRange.from && dateRange.to
              ? `From ${new Date(dateRange.from).toLocaleDateString()} To ${new Date(dateRange.to).toLocaleDateString()}`
              : "Check-in & Check-out"}
          </button>
        </div>
        <div className="border-l h-10 mx-4" />
        <GuestInput
          guests={guests}
          onChange={(val) => setValue("guests", val)}
        />
        <SearchButton />
      </form>

      {showCalendar && (
        <div
          ref={calendarRef}
          className="absolute top-[90px] left-1/2 -translate-x-1/2 z-50">
          <DateRangeSelector
            dateRange={dateRange}
            onChange={(range) => {
              setValue("checkIn", new Date(range.from!));
              setValue("checkOut", new Date(range.to!));
              if (range.from && range.to) setShowCalendar(false);
            }}
          />
        </div>
      )}

      {status === "pending" && <PageLoader />}
      {isError && (
        <p className="text-center text-red-500 mt-6">
          Something went wrong. Please try again.
        </p>
      )}
      {venues && venues.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {venues.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </div>
      )}
      {venues && venues.length === 0 && status === "success" && (
        <p className="text-center text-gray-500 mt-6">
          No venues match your search.
        </p>
      )}
    </>
  );
};

export default VenueSearchForm;
