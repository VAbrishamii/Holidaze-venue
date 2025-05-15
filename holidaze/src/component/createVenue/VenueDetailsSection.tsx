import { UseFormRegister, FieldErrors } from "react-hook-form";
import { VenueFromBooking } from "@/Lib/validation/venueSchema";

interface Props {
  register: UseFormRegister<VenueFromBooking>;
  errors: FieldErrors<VenueFromBooking>;
}

export default function VenueDetailsSection({ register, errors }: Props) {
  return (
    <>
      <div className="col-span-full">
        <label className="font-medium">Venue Name</label>
        <input {...register("name")} className="w-full border px-3 py-2 rounded-md" />
        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
      </div>

      <div className="col-span-full">
        <label className="font-medium">Description</label>
        <textarea {...register("description")} className="w-full h-24 border px-3 py-2 rounded-md" />
        {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
      </div>
    </>
  );
}
