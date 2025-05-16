"use client";

interface Props {
  isPending: boolean;
  errors: any;
  buttonLabel?: string;
}

export default function VenueSubmitSection({ isPending, errors, buttonLabel = "Create Venue"}: Props) {
  return (
    <div className="col-span-full flex justify-end">
      {/* {Object.keys(errors).length > 0 && (
        <pre className="text-xs text-red-500 bg-yellow-100 p-2 rounded mt-4">
          {JSON.stringify(errors, null, 2)}
        </pre>
      )} */}
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
