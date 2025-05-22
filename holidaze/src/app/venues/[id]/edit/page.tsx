"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { VenueFromBooking, venueSchema } from "@/Lib/validation/venueSchema";
import { getVenueById, updateVenue } from "@/Lib/api/venue";
import { mapVenueToFormDefaults } from "@/Lib/utils/mapVenueToFormDefaults";
import ImageUploader from "@/component/ui/ImageUploader";
import VenueDetailsSection from "@/component/createVenue/VenueDetailsSection";
import VenuePricingSection from "@/component/createVenue/VenuePriceSection";
import VenueLocationSection from "@/component/createVenue/VenueLocationSection";
import AmenitiesSelector from "@/component/createVenue/AmenitiesSelector";
import VenueSubmitSection from "@/component/createVenue/VenueSubmittSection";
import { useMutation } from "@tanstack/react-query";
import PageLoader from "@/component/ui/PageLoader";
import { formatVenueData } from "@/Lib/utils/formatVenueData";
/**
 * EditVenuePage is a form-based page that allows venue managers
 * to edit an existing venue using pre-filled form data.
 * It loads venue details based on the dynamic route [id],
 * maps them to form-compatible values, and allows users
 * to update and submit the modified venue data.
 */
export default function EditVenuePage() {
  const { id } = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  /**
   * React Hook Form setup with Zod validation.
   */
  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<VenueFromBooking>({
    resolver: zodResolver(venueSchema),
  });

  const amenities = watch("amenities");

  const media = watch("media");

  /**
   * Fetches venue details from the API using the venue ID.
   * Maps response into form values using `mapVenueToFormDefaults`.
   * Resets the form with the pre-filled venue data.
   */
  useEffect(() => {
    async function fetchVenue() {
      try {
        const venue = await getVenueById(id as string);
        const mappedVenue = mapVenueToFormDefaults(venue.data);

        reset(mappedVenue);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching venue:", error);
        toast.error("Failed to fetch venue.");
        router.push("/404");
      }
    }
    fetchVenue();
  }, [id, reset, router]);

  /**
   * React Query mutation for updating the venue.
   * Uses formatVenueData to prepare the payload for the API.
   */
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: VenueFromBooking) => {
      const formatted = formatVenueData(data);
      return await updateVenue(id as string, formatted);
    },
    onSuccess: () => {
      toast.success("Venue updated!");
      router.push("/auth/profile");
    },
    onError: () => toast.error("Update failed"),
  });
  /**
   * Handles form submission by calling mutate() with form data.
   * @param data - Form values typed as VenueFromBooking
   */
  const onSubmit = (data: VenueFromBooking) => {
    mutate(data);
  };

  if (isLoading)
    return (
      <div>
        <PageLoader />
      </div>
    );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 max-w-4xl mx-auto">
      <VenueDetailsSection register={register} errors={errors} />

      <div className="col-span-full">
        <ImageUploader
          label="Venue Images"
          value={media ?? []}
          onChange={(images) => setValue("media", images)}
          multiple
        />
      </div>

      <VenuePricingSection
        register={register}
        control={control}
        errors={errors}
      />
      <VenueLocationSection
        register={register}
        control={control}
        errors={errors}
      />

      <div className="col-span-full">
        <AmenitiesSelector
          value={{
            wifi: amenities?.wifi ?? false,
            breakfast: amenities?.breakfast ?? false,
            parking: amenities?.parking ?? false,
            pets: amenities?.pets ?? false,
          }}
          onChange={(updated) => setValue("amenities", updated)}
        />
      </div>

      <VenueSubmitSection
        isPending={isPending}
        errors={errors}
        buttonLabel="Update"
      />
    </form>
  );
}
