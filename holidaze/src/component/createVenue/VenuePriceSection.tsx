"use client";

import {
  Controller,
  UseFormRegister,
  Control,
  FieldErrors,
} from "react-hook-form";
import { VenueFromBooking } from "@/Lib/validation/venueSchema";
import GuestInput from "@/component/search/GuestInput";

interface Props {
  register: UseFormRegister<VenueFromBooking>;
  control: Control<VenueFromBooking>;
  errors: FieldErrors<VenueFromBooking>;
}
/**
 * VenuePricingSection component
 * - Renders input fields for price and max guests
 * - Uses React Hook Form for form handling
 * - Displays validation errors
 */
export default function VenuePricingSection({
  register,
  control,
  errors,
}: Props) {
  return (
    <>
      {/* Price */}
      <div>
        <label className="font-medium">Price per night</label>
        <input
          type="number"
          {...register("price", { valueAsNumber: true })}
          className="w-full border px-3 py-2 rounded-md"
        />
        {errors.price && (
          <p className="text-sm text-red-500">{errors.price.message}</p>
        )}
      </div>

      {/* Max Guests */}
      <div>
        <Controller
          name="maxGuests"
          control={control}
          render={({ field }) => (
            <GuestInput
              guests={field.value}
              onChange={field.onChange}
              maxGuests={50}
              label="Max Guests"
              placeholder="Add Max Guests"
              inputClassName="w-full border border-[var(--color-primary)] px-3 py-3 text-gray-500"
              wrapperClassName="w-full"
            />
          )}
        />
        {errors.maxGuests && (
          <p className="text-sm text-red-500">{errors.maxGuests.message}</p>
        )}
      </div>
    </>
  );
}
