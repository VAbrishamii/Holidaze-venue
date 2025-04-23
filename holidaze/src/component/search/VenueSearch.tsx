"use client";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchSchema, SearchSchema } from "@/Lib/validation/searchSchema";
import { searchVenues } from "@/Lib/api/venue";
import { SearchVenueParams, Venue } from "@/Lib/types/venue";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import LocationInput from "./LocationInput";
import DateRangeSelector from "./DateRangeSelector";
import GuestInput from "./GuestInput";
import SearchButton from "./SearchButton";
import VenueCard from "@/component/venues/VenueCard"; 
import PageLoader from "@/component/ui/PageLoader"; 

const VenueSearchForm: React.FC = () => {
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SearchSchema>({
    resolver: zodResolver(searchSchema),
  });

  const mutation: UseMutationResult<Venue[], Error, SearchVenueParams> =
    useMutation({
      mutationFn: searchVenues,
    });
  const { mutate, data: venues, status, isError } = mutation;

  const onSubmit = (data: SearchSchema) => {
    const locationParts = data.location.split(",").map((part) => part.trim());

    const city = locationParts.length > 1 ? locationParts[0] : undefined;
    const country =
      locationParts.length > 1 ? locationParts[1] : locationParts[0];
    console.log("form data", data);
    mutate({
      city,
      country,
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

  const [showCalendar, setShowCalendar] = React.useState(false);
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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative bg-white shadow-lg p-4 m-4 border rounded-full flex flex-wrap gap-4 items-center justify-center w-full max-w-4xl mx-auto">
        <LocationInput
          value={location}
          onChange={(value) => setValue("location", value)}
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
          onChange={(value) => setValue("guests", value)}
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
              if (range.from && range.to) {
                setShowCalendar(false);
              }
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

      {venues && venues.length === 0 && !status && (
        <p className="text-center text-gray-500 mt-6">
          No venues match your search.
        </p>
      )}
    </>
  );
};

export default VenueSearchForm;
