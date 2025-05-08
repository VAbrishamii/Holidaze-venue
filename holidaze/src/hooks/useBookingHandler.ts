" use client";
import { useMutation } from "@tanstack/react-query";
import { createBooking } from "@/Lib/api/booking";
import { BookingRequest } from "@/Lib/types/booking";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export function useBookingHandler(redirectAfterBooking: boolean = true) {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (data: BookingRequest) => createBooking(data),
    onSuccess: () => {
      toast.success("Booking confirmed!");
      if (redirectAfterBooking) {
        router.push("/profile");
      }
    },
    onError: () => {
      toast.error("Booking failed. Please try again.");
    },
  });

  return {
    createBooking: mutation.mutate,
    isBooking: mutation.isPending,
  };
}
