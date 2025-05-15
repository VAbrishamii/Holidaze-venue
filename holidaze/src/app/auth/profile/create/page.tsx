"use client";

import { useForm, Controller, UseFormProps } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createVenue } from "@/Lib/api/venue";
import GuestInput from "@/component/search/GuestInput";
import LocationInput from "@/component/search/LocationInput";
import AmenitiesSelector from "@/component/ui/AmenitiesSelector";
import ImageUploader from "@/component/ui/ImageUploader";
import { toast } from "react-hot-toast";
import { venueSchema, VenueFromBooking } from "@/Lib/validation/venueSchema";

interface CreateVenueFormProps extends Partial<UseFormProps<VenueFromBooking>> {
  onSubmitHandler?: (data: VenueFromBooking) => void;
}

export default function CreateVenueForm({
  defaultValues,
  onSubmitHandler,
  ...formProps
}: CreateVenueFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<VenueFromBooking>({
    resolver: zodResolver(venueSchema),
    defaultValues: defaultValues || {
      name: "",
      description: "",
      price: 0,
      maxGuests: 1,
      location: {
        country: "",
        address: "",
      },
      amenities: {
        wifi: false,
        breakfast: false,
        parking: false,
        pets: false,
      },
      media: [],
    },
    ...formProps,
  });
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
    const formattedData = {
      ...data,
      media: data.media.map((url) => ({ url, alt: `${data.name} image` })),
      location: {
        ...data.location,
        city: "Testville",
        zip: "1234",
        continent: "Europe",
        lat: 58.2,
        lng: 8.0,
      },
      meta: {
        wifi: data.amenities.wifi,
        parking: data.amenities.parking,
        breakfast: data.amenities.breakfast,
        pets: data.amenities.pets,
      },
    };

    submitVenue(formattedData);
  };

  return (
    <form
      onSubmit={(e) => {
        console.log("Form submitted");
        handleSubmit(onSubmit)(e);
      }}
      className="grid grid-cols-1 p-8 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
      {/* Name */}
      <div className="col-span-full">
        <label className="font-medium">Venue Name</label>
        <input
          {...register("name")}
          className="w-full border px-3 py-2 rounded-md"
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* Description */}
      <div className="col-span-full">
        <label className="font-medium">Description</label>
        <textarea
          {...register("description")}
          className="w-full h-24 border px-3 py-2 rounded-md"
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>
      {/* Image Uploader */}
      <div className="col-span-full">
        <Controller
          name="media"
          control={control}
          render={({ field }) => (
            <ImageUploader
              label="Venue Images"
              value={field.value}
              onChange={field.onChange}
              multiple
            />
          )}
        />
      </div>

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
        {/* <label className="font-medium">Max Guests</label> */}
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

      {/* Location */}
      <div>
        <label className="font-medium"></label>
        <Controller
          name="location.country"
          control={control}
          render={({ field }) => (
            <LocationInput
              value={field.value}
              onChange={field.onChange}
              label="Country"
              placeholder="Enter country or city"
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

      <div>
        <label className="font-medium">Address</label>
        <input
          {...register("location.address")}
          className="w-full border px-3 py-2 rounded-md"
        />
        {errors.location?.address && (
          <p className="text-sm text-red-500">
            {errors.location.address.message}
          </p>
        )}
      </div>

      {/* Amenities */}
      <div className="col-span-full">
        <Controller
          name="amenities"
          control={control}
          render={({ field }) => (
            <AmenitiesSelector
              value={field.value}
              onChange={(partial) =>
                field.onChange({
                  ...field.value,
                  ...partial,
                })
              }
            />
          )}
        />
      </div>

<div className="col-span-full">
  {Object.keys(errors).length > 0 && (
    <pre className="text-xs text-red-500 bg-yellow-100 p-2 rounded mt-4">
      {JSON.stringify(errors, null, 2)}
    </pre>
  )}
  <button
    type="submit"
    className="bg-[var(--color-darkgreen)] text-white px-6 py-2 rounded-md hover:bg-[var(--color-primary)] transition duration-200">
    {isPending ? "Creating..." : "Create Venue"}
  </button>
</div>
    </form>
  );
}
