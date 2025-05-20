"use client";

interface Props {
  isPending: boolean;
  errors: any;
  buttonLabel?: string;
}

export default function VenueSubmitSection({ isPending, buttonLabel = "Create Venue"}: Props) {
  return (
    <div className="col-span-full flex justify-end">
  
      <button
        type="submit"
        className="bg-[var(--color-darkgreen)]  text-white px-6 py-2 rounded-md hover:bg-[var(--color-primary)] transition duration-200"
      disabled={isPending}
      >
        {isPending ? "Submitting" : buttonLabel}
      </button>
    </div>
  );
}
