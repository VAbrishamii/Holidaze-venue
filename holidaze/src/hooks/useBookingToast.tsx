"use client";
import { Toast, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import React from "react";
import { format } from "date-fns";

type ToastProps = {
  venueName: string;
  from: string;
  to: string;
  totalPrice: number;
};

export function useBookingToast() {
  const router = useRouter();
  // const { isManager } = useAuth();

  const BookingToast = ({
    t,
    venueName,
    from,
    to,
    totalPrice,
  }: ToastProps & { t: Toast }) => (
    <div className="bg-white px-6 py-4 mt-36 rounded-2xl shadow-md w-full h-full max-w-sm border border-gray-300 ">
      <p className="text-lg font-bold text-[var-(--color-primary)]">
        Booking Confirmed!
      </p>
      <p className="text-base mt-1 text-black">
        <strong>{venueName}</strong>{" "}
      </p>
      <p className="text-base mt-1 text-black">
        From : <strong>{from}</strong> To : <strong>{to}</strong>
      </p>

      <p className="text-base text-black">Total: ${totalPrice}</p>
      <div className="flex justify-between mt-2">
        <button
          onClick={() => {
            router.push("/auth/profile");
            toast.dismiss(t.id);
          }}
          className="mt-3 text-white bg-[var(--color-darkgreen)] hover:bg-emerald-700 px-3 py-1 rounded text-sm">
          View in Profile
        </button>
        <button
          onClick={() => toast.dismiss(t.id)}
          className="text-sm text-gray-500 hover:text-[var(--color-secondary)]">
          Close
        </button>
      </div>
    </div>
  );

  const showToast = ({ venueName, from, to, totalPrice }: ToastProps) => {
    const localFrom = format(new Date(from + "T12:00:00"), "dd MMM yyyy");
    const localTo = format(new Date(to + "T12:00:00"), "dd MMM yyyy");

    toast.custom(
      (t) => (
        <BookingToast
          t={t}
          venueName={venueName}
          from={localFrom}
          to={localTo}
          totalPrice={totalPrice}
        />
      ),
      {
        duration: Infinity,
        position: "top-center",
      }
    );
  };

  return { showToast };
}
