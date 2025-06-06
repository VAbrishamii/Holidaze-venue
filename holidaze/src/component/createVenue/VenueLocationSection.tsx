"use client";

import {
  Controller,
  UseFormRegister,
  Control,
  FieldErrors,
} from "react-hook-form";
import { VenueFromBooking } from "@/Lib/validation/venueSchema";
import LocationInput from "@/component/search/LocationInput";

interface Props {
  register: UseFormRegister<VenueFromBooking>;
  control: Control<VenueFromBooking>;
  errors: FieldErrors<VenueFromBooking>;
}
/**
 * VenueLocationSection component
 * - Renders input fields for country, city, and address
 * - Uses React Hook Form for form handling
 * - Displays validation errors

 */
export default function VenueLocationSection({
  register,
  control,
  errors,
}: Props) {
  return (
    <>
      {/* Country */}
      <div>
        <Controller
          name="location.country"
          control={control}
          render={({ field }) => (
            <LocationInput
              value={field.value}
              onChange={field.onChange}
              label="Country"
              placeholder="Enter country"
              inputClassName="border border-[var(--color-primary)] px-3 py-3 text-gray-500"
              wrapperClassName="w-full"
            />
          )}
        />
        {errors.location?.country && (
          <p className="text-sm text-red-500">
            {errors.location.country.message}
          </p>
        )}
      </div>
      {/* City */}
      <div>
        <Controller
          name="location.city"
          control={control}
          render={({ field }) => (
            <LocationInput
              value={field.value}
              onChange={field.onChange}
              label="City"
              placeholder="Enter city"
              inputClassName="border border-[var(--color-primary)] px-3 py-3 text-gray-500"
              wrapperClassName="w-full"
            />
          )}
        />
        {errors.location?.city && (
          <p className="text-sm text-red-500">{errors.location.city.message}</p>
        )}
      </div>

      {/* Address */}
      <div>
        <label htmlFor="address" className="font-medium">
          Address
        </label>
        <input
          id="address"
          {...register("location.address")}
          placeholder="Street or area"
          className="w-full border px-3 py-2 rounded-md"
        />
        {errors.location?.address && (
          <p className="text-sm text-red-500">
            {errors.location.address.message}
          </p>
        )}
      </div>
    </>
  );
}
