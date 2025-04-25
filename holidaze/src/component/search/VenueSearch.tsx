"use client";
import React from "react";
import { useMutation } from "@tanstack/react-query";
import { useVenueSearchForm } from "@/hooks/useVenueSearchForm";
import { searchVenues } from "@/Lib/api/venue";
import { SearchVenueParams, Venue } from "@/Lib/types/venue";
import { SearchSchema } from "@/Lib/validation/searchSchema";
import { normalizeDateToUTC } from "@/Lib/utils/date";
import { useToastFeedback } from "@/hooks/useToastFeedback";

import LocationInput from "./LocationInput";
import DateRangeSelector from "./DateRangeSelector";
import GuestInput from "./GuestInput";
import SearchButton from "./SearchButton";
import SearchResults from "./SearchResult";
import { on } from "events";

/**
 * VenueSearchForm component for searching venues
 * - Uses react-hook-form for form state
 * - Uses react-query for async search
 * - Displays search results or error messages
 * - Uses custom hooks for form management and validation
 * - Uses custom components for location input, date range selector, and guest input
 * - Uses react-hot-toast for notifications
 *
 */
interface VenueSearchFormProps {
  onSearch: () => void;
}
const VenueSearchForm: React.FC<VenueSearchFormProps> = ({onSearch}) => {
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useVenueSearchForm();

  const toast = useToastFeedback();

  const mutation = useMutation<Venue[], Error, SearchVenueParams>({
    mutationFn: searchVenues,
    onMutate: () => {
      toast.loading("Searching for venues...");
    },
    onSuccess: (data) => {
      if (data.length === 0) {
        toast.success("No venues match your search.");
      } else {
        toast.success("Venues loaded!");
      }
    },
    onError: () => {
      toast.error("Something went wrong. Please try again.");
    },
    onSettled: () => {
      toast.dismiss(); // Always close loading toast
    },
  });

  const { mutate, data: venues, status, isError } = mutation;

  const onSubmit = (data: SearchSchema) => {
    onSearch();
    console.log("form submitted");
    console.log("summited data", data);
    const [city, country] = data.location.split(",").map((p) => p.trim());
    mutate({
      city,
      country: city && country ? country : city,
      maxGuests: data.guests,
      dateFrom: normalizeDateToUTC(data.checkIn).toISOString(),
      dateTo: normalizeDateToUTC(data.checkOut).toISOString(),
    });
  };

  const location = watch("location");
  const guests = watch("guests");
  const dateRange = {
    from: watch("checkIn")?.toISOString(),
    to: watch("checkOut")?.toISOString(),
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit, (errors) => {
          const firstError = Object.values(errors)[0];
          if (firstError && firstError.message) {
            toast.error(firstError.message.toString());
          }
        })}
        className="relative bg-white shadow-lg p-4 m-4 border rounded-full flex flex-wrap gap-4 items-center justify-center w-full max-w-4xl mx-auto">
        <LocationInput
          value={location}
          onChange={(val) => setValue("location", val)}
        />
        <div className="border-l h-10 mx-4" />

        <DateRangeSelector
          dateRange={dateRange}
          onChange={(range) => {
            setValue("checkIn", new Date(range.from!));
            setValue("checkOut", new Date(range.to!));
          }}
        />
        <div className="border-l h-10 mx-4" />

        <GuestInput
          guests={guests}
          onChange={(val) => setValue("guests", val)}
        />
        <SearchButton />
      </form>
      <SearchResults venues={venues} status={status} isError={isError} />

    
    </>
  );
};

export default VenueSearchForm;
