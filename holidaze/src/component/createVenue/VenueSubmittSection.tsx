"use client";

import { FieldErrors } from "react-hook-form";
import { VenueFromBooking } from "@/Lib/validation/venueSchema";

interface Props {
  isPending: boolean;
  errors: FieldErrors<VenueFromBooking>;
  buttonLabel?: string;
}
/**
 * VenueSubmitSection component
 * - Renders a submit button for the venue form
 * - Displays validation errors if any
 * - Accepts a custom button label
 * - Handles loading state during submission
 */
export default function VenueSubmitSection({
  isPending,
  errors,
  buttonLabel = "Create Venue",
}: Props) {
  return (
    <div className="col-span-full flex justify-end">
      {errors.root?.message && (
        <p className="text-sm text-[var(--color-error)]">
          {errors.root.message}
        </p>
      )}

      <button
        type="submit"
        className="bg-[var(--color-darkgreen)]  text-white px-6 py-2 rounded-md hover:bg-[var(--color-primary)] transition duration-200"
        disabled={isPending}>
        {isPending ? "Submitting" : buttonLabel}
      </button>
    </div>
  );
}
