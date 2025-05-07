import { useMemo } from "react";

/**
 * Calculates the total price for a venue booking.
 * @param from - Start date of the booking (ISO string or Date).
 * @param to - End date of the booking (ISO string or Date).
 * @param pricePerNight - The price of the venue per night.
 * @returns total price for the stay
 */

export function useTotalPrice(
  from?: string | Date,
  to?: string | Date,
  pricePerNight?: number
): number {
  return useMemo(() => {
    if (!from || !to || !pricePerNight) return 0;
    const fromDate = typeof from === "string" ? new Date(from) : from;
    const toDate = typeof to === "string" ? new Date(to) : to;

    const diffInMs = toDate.getTime() - fromDate.getTime();
    const nights = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
    if (nights <= 0) return 0;

    return nights * pricePerNight;
  }, [from, to, pricePerNight]);
}
