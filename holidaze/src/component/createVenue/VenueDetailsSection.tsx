import { UseFormRegister, FieldErrors } from "react-hook-form";
import { VenueFromBooking } from "@/Lib/validation/venueSchema";

interface Props {
  register: UseFormRegister<VenueFromBooking>;
  errors: FieldErrors<VenueFromBooking>;
}
/**
 * VenueDetailsSection component
 * - Renders input fields for venue name and description
 * - Uses React Hook Form for form handling
 * - Displays validation errors
 
 */
export default function VenueDetailsSection({ register, errors }: Props) {
  return (
    <>
      <div className="col-span-full">
        <label htmlFor="venue-name" className="font-medium">
          Venue Name
        </label>
        <input
          id="venue-name"
          {...register("name")}
          className="w-full border px-3 py-2 rounded-md"
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="col-span-full">
        <label htmlFor="venue-description" className="font-medium">
          Description
        </label>
        <textarea
          id="venue-description"
          {...register("description")}
          className="w-full h-24 border px-3 py-2 rounded-md"
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>
    </>
  );
}
