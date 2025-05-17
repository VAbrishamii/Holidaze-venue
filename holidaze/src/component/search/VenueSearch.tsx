"use client";
import React from "react";
import { useVenueSearchForm } from "@/hooks/useVenueSearchForm";
import { SearchVenueParams } from "@/Lib/types/venue";
import { SearchSchema } from "@/Lib/validation/searchSchema";
import { normalizeDateToUTC } from "@/Lib/utils/date";
import { useToastFeedback } from "@/hooks/useToastFeedback";

import LocationInput from "./LocationInput";
import DateRangeSelector from "./DateRangeSelector";
import GuestInput from "./GuestInput";
import SearchButton from "./SearchButton";

interface VenueSearchFormProps {
  onSearch: (params: SearchVenueParams) => void;
}

const VenueSearchForm: React.FC<VenueSearchFormProps> = ({ onSearch }) => {
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useVenueSearchForm();

  const toast = useToastFeedback();

  const onSubmit = (data: SearchSchema) => {
    const [city, country] = data.location.split(",").map((p) => p.trim());

    const searchParams: SearchVenueParams = {
      city,
      country: city && country ? country : city,
      maxGuests: data.guests,
      dateFrom: normalizeDateToUTC(data.checkIn).toISOString(),
      dateTo: normalizeDateToUTC(data.checkOut).toISOString(),
    };
console.log('submitting search params', searchParams);
    onSearch(searchParams);
  };

  const location = watch("location");
  const guests = watch("guests");
  const dateRange = {
    from: watch("checkIn")?.toISOString(),
    to: watch("checkOut")?.toISOString(),
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, (errors) => {
        const firstError = Object.values(errors)[0];
        if (firstError && firstError.message) {
          toast.error(firstError.message.toString());
        }
      })}
      className="relative bg-white shadow-lg p-4 m-4 border rounded-xl flex flex-col gap-4 w-full max-w-[95%] mx-auto md:flex-row md:flex-nowrap md:gap-0 md:rounded-full md:justify-around md:items-center md:max-w-4xl">
      <LocationInput
        value={location}
        onChange={(val) => setValue("location", val)}
        placeholder="Search your destination"
        inputClassName="bg-white text-gray-500 hover:cursor-pointer"
        wrapperClassName="mr-4 px-2"
      />

      <div className="w-full h-[1px] bg-gray-300 md:w-[1px] md:h-10 md:mx-4" />

      <DateRangeSelector
        dateRange={dateRange}
        onChange={(range) => {
          setValue("checkIn", new Date(range.from!));
          setValue("checkOut", new Date(range.to!));
        }}
      />

      <div className="w-full h-[1px] bg-gray-300 md:w-[1px] md:h-10 md:mx-4" />

      <GuestInput guests={guests} onChange={(val) => setValue("guests", val)} label="Guest" placeholder="Add Guest" inputClassName="" wrapperClassName="mr-4" />
      <SearchButton />
    </form>
  );
};

export default VenueSearchForm;
