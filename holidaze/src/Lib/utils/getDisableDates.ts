import { Booking } from "@/Lib/types/venue";

export function getDisableDates(bookings: Booking[]): Date[] {
  const disabledDates: Date[] = [];
  bookings.forEach((booking) => {
    const from = new Date(booking.dateFrom);
    const to = new Date(booking.dateTo);
    // Fill in all dates in between (inclusive)
    for (let d = new Date(from); d <= to; d.setDate(d.getDate() + 1)) {
      disabledDates.push(new Date(d));
    }
  });

  return disabledDates;
}
