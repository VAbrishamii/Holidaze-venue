"use client";

import { useForm, Controller, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { venueSchema, VenueFromBooking } from "@/Lib/validation/venueSchema";
import { formatVenueData } from "@/Lib/utils/formatVenueData";
import { defaultVenueValues } from "@/Lib/validation/venueDefault";
import { createVenue } from "@/Lib/api/venue";

import VenueDetailsSection from "@/component/createVenue/VenueDetailsSection";
import VenuePricingSection from "@/component/createVenue/VenuePriceSection";
import AmenitiesSelector from "./AmenitiesSelector";
import VenueLocationSection from "@/component/createVenue/VenueLocationSection";
import VenueAmenitiesSection from "@/component/createVenue/VenueSubmittSection";
import VenueSubmitSection from "@/component/ui/ImageUploader";


export default function CreateVenueForm() {
  const methods = useForm<VenueFromBooking>({
    resolver: zodResolver(venueSchema),
    defaultValues: defaultVenueValues,
  });

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = methods;

  const router = useRouter();

  const { mutate: submitVenue, isPending } = useMutation({
    mutationFn: createVenue,
    onSuccess: () => {
      toast.success("Venue created!");
      router.push("/auth/profile");
    },
    onError: () => toast.error("Failed to create venue"),
  });

  const onSubmit = (data: VenueFromBooking) => {
    console.log("submitting venue", data);
    const formattedData = formatVenueData(data);
    // Ensure meta booleans are not undefined
    if (formattedData.meta) {
      formattedData.meta = {
        wifi: Boolean(formattedData.meta.wifi),
        parking: Boolean(formattedData.meta.parking),
        breakfast: Boolean(formattedData.meta.breakfast),
        pets: Boolean(formattedData.meta.pets),
      };
    } else {
      formattedData.meta = {
        wifi: false,
        parking: false,
        breakfast: false,
        pets: false,
      };
    }
    submitVenue(formattedData);
  };

  return (
    <form
  onSubmit={handleSubmit(onSubmit)}
  className="grid grid-cols-1 p-8 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
>
  <VenueDetailsSection register={register} errors={errors} />

  {/* FIXED: Wrap AmenitiesSelector with Controller and pass props correctly */}
  <div className="col-span-full">
    <Controller
      name="amenities"
      control={control}
      render={({ field }) => (
        <AmenitiesSelector
          value={field.value}
          onChange={field.onChange}
        />
      )}
    />
  </div>

  <VenuePricingSection register={register} control={control} errors={errors} />
  <VenueLocationSection register={register} control={control} errors={errors} />
  <ImageUploader />
</form>

  );
}
