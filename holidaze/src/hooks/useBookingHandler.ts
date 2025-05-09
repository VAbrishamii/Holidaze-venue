" use client";
import { useMutation } from "@tanstack/react-query";
import { createBooking } from "@/Lib/api/booking";
import { BookingRequest } from "@/Lib/types/booking";
import { useRouter } from "next/navigation";

export function useBookingHandler(redirectAfterBooking: boolean = true) {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (data: BookingRequest) => createBooking(data),
  });

  return {
    createBooking: mutation.mutate,
    isBooking: mutation.isPending,
  };
}
