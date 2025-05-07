import { useMemo } from "react";


interface UseTotalPriceProps {
    pricePerNight: number;
    from?: string;
    to?: string;
  }
/**
 * Calculates the total price for a venue booking.
 * @param from - Start date of the booking (ISO string or Date).
 * @param to - End date of the booking (ISO string or Date).
 * @param pricePerNight - The price of the venue per night.
 * @returns total price for the stay
 */

export default function useTotalPrice({
    pricePerNight,
    from,
    to,
  }: UseTotalPriceProps): number {
    return useMemo(() => {
      if (!from || !to) return 0;
      const start = new Date(from);
      const end = new Date(to);
      const timeDiff = Math.abs(end.getTime() - start.getTime());
      const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      return days * pricePerNight;
    }, [pricePerNight, from, to]);
  }
