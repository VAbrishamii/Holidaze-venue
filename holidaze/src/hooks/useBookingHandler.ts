" use client";
import { useMutation } from "@tanstack/react-query";
import { createBooking } from "@/Lib/api/booking";
import { BookingRequest } from "@/Lib/types/booking";
/**
 * Custom hook to handle booking creation
 *   - Uses react-query for mutation
 *  - Returns createBooking function and isBooking state
 *  - createBooking function takes BookingRequest as parameter
 */
export function useBookingHandler() {
  const mutation = useMutation({
    mutationFn: (data: BookingRequest) => createBooking(data),
  });

  return {
    createBooking: mutation.mutate,
    isBooking: mutation.isPending,
  };
}
