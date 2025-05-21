" use client";
import { useMutation } from "@tanstack/react-query";
import { createBooking } from "@/Lib/api/booking";
import { BookingRequest } from "@/Lib/types/booking";

export function useBookingHandler() {
  const mutation = useMutation({
    mutationFn: (data: BookingRequest) => createBooking(data),
  });

  return {
    createBooking: mutation.mutate,
    isBooking: mutation.isPending,
  };
}
