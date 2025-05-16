"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { venueSchema, VenueFromBooking } from "@/Lib/validation/venueSchema";
import { defaultVenueValues } from "@/Lib/validation/venueDefault";
import { formatVenueData } from "@/Lib/utils/formatVenueData";
import VenueDetailsSection from "./VenueDetailsSection";
import ImageUploader from "../ui/ImageUploader";
import VenuePricingSection from "./VenuePriceSection";
import VenueLocationSection from "./VenueLocationSection";
import VenueSubmitSection from "./VenueSubmittSection";
import AmenitiesSelector from "./AmenitiesSelector";
import { createVenue } from "@/Lib/api/venue";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

/**
 * Renders a form for creating a new venue listing.
 * This form uses React Hook Form with Zod validation schema.
 */
export default function CreateVenueForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
    control,
  } = useForm<VenueFromBooking>({
    resolver: zodResolver(venueSchema),
    defaultValues: defaultVenueValues,
  });
  const media = watch("media");
  const amenities = watch("amenities");
  const Router = useRouter();

    const { mutate, isPending } = useMutation({
    mutationFn: async (data: VenueFromBooking) => {
      const formatted = formatVenueData(data);
      return await createVenue(formatted);
    },
    onSuccess: (data) => {
      toast.success("Venue created successfully!");
      reset();
      Router.push("/auth/profile");
      console.log("Success:", data);
    },
    onError: (error: any) => {
      toast.error("Failed to create venue. Try again.");
      console.error(error);
    },
  });
  /**
   * Handles submission of venue data, formats it, and logs to console (temporary).
   * Replace this with an API call later.
   * @param data - Raw form data
   */
  const onSubmit = (data: VenueFromBooking) => {
    mutate(data);
    console.log("Submitted data:", data);
    reset();
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 max-w-4xl mx-auto">
      {/* Venue Details */}
      <VenueDetailsSection register={register} errors={errors} />

      {/* Image uploader */}
      <div className="col-span-full">
        <ImageUploader
          label="Venue Images"
          value={media ?? []}
          onChange={(images) => setValue("media", images)}
          multiple
        />
        {errors.media && (
          <p className="text-sm text-red-500">
            {(errors.media as any)?.message}
          </p>
        )}
      </div>
      {/* Price & Max Guests */}
      <VenuePricingSection
        register={register}
        control={control}
        errors={errors}
      />
      {/* Location Section */}
      <VenueLocationSection
        register={register}
        control={control}
        errors={errors}
      />
       {/* Amenities */}
      <div className="col-span-full">
        <AmenitiesSelector
          value={{
            wifi: amenities?.wifi ?? false,
            breakfast: amenities?.breakfast ?? false,
            parking: amenities?.parking ?? false,
            pets: amenities?.pets ?? false,
          }}
          onChange={(updatedAmenities) => setValue("amenities", updatedAmenities)}
        />
      </div>
      {/* Submit Section */}
      <VenueSubmitSection isPending={isPending} errors={errors} />
    </form>
  );
}
