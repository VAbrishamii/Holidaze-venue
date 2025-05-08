"use client";
import React, { useState, useMemo } from "react";
import DateRangeSelector, {
  BookingDateRange,
} from "@/component/search/DateRangeSelector";
import { VenueDetails } from "@/Lib/types/venue";
import useTotalPrice from "@/hooks/useTotalPrice";
import GuestInput from "@/component/search/GuestInput";
import { getDisableDates } from "@/Lib/utils/getDisableDates";
import { getNumberOfNights } from "@/Lib/utils/date";
import { useAuth } from "@/hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";

interface BookingBoxProps {
  venue: VenueDetails;
}
/**
 * BookingBox component
 * - Allows the user to select a date range
 * - Calculates total price based on selected days and venue price
 * - Disables already booked dates from the calendar
 */
const BookingBox: React.FC<BookingBoxProps> = ({ venue }) => {
  const [dateRange, setDateRange] = useState<BookingDateRange>({});
  const { isLoggedIn } = useAuth();
  const [guests, setGuests] = useState<number>(1);
  const numberOfNights = getNumberOfNights(dateRange.from, dateRange.to);

  const handleBooking = () => {
    if (!isLoggedIn) {
      toast.error("Please log in to book a venue.");
      return;
    }
  };

  // Get unavailable dates from existing bookings
  const disabledDates = useMemo(
    () => getDisableDates(venue.bookings || []),
    [venue.bookings]
  );
  // Calculate total price based on selected date range
  const totalPrice = useTotalPrice({
    pricePerNight: venue.price,
    from: dateRange.from,
    to: dateRange.to,
  });

  return (
    <div className="border rounded-2xl p-6 max-w-sm w-full shadow-sm animate-fade-in">
      {/* Price top */}
      <p className="text-lg font-bold mb-4">
        ${venue.price}{" "}
        <span className="font-normal text-gray-500">Nightly</span>
      </p>

      {/* Date + Guests */}
      <div className="border rounded-2xl overflow-visible relative">
        <div className="p-3">
          <DateRangeSelector
            dateRange={dateRange}
            onChange={setDateRange}
            disabledDates={disabledDates}
          />
        </div>

        <div className="p-2 border-t">
          <label
            htmlFor="guest"
            className="text-sm font-bold block mb-1"></label>
          <GuestInput
            guests={guests}
            onChange={setGuests}
            maxGuests={venue.maxGuests}
          />
        </div>
      </div>

      {/* Book button */}
      <button
        onClick={handleBooking}
        disabled={!dateRange.from || !dateRange.to || guests < 1}
        className={`mt-6 w-full text-white text-lg py-3 rounded-full transition duration-300 ease-in-out ${
          !dateRange.from || !dateRange.to || guests < 1
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-[var(--color-secondary)] hover:bg-teal-700 cursor-pointer"
        }`}>
        Book
      </button>

      {/* Price breakdown */}
      <div className="mt-6 space-y-2">
        <div className="flex justify-between text-sm font-semibold">
          <span>
            {" "}
            ${venue.price} × {numberOfNights} night
            {numberOfNights > 1 ? "s" : ""}
          </span>
          <span>{totalPrice} $</span>
        </div>
        <hr />
        <div className="flex justify-between text-base font-bold">
          <span>Total</span>
          <span>{totalPrice}$ </span>
        </div>
      </div>
    </div>
  );
};

export default BookingBox;
