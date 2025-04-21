"use client";
import React, { useState } from "react";
import DatePicker, { BookingDateRange } from "@/component/ui/Calendar";
import { Search } from "lucide-react";

/**
 * A search form for filtering venues by location, date, and number of guests.
 */
const VenueSearchForm: React.FC = () => {
  const [location, setLocation] = useState("");
  const [guests, setGuests] = useState(1);
  const [dateRange, setDateRange] = useState<BookingDateRange>({});
  const [showCalendar, setShowCalendar] = useState(false);

  /**
   * Handles the form submission
   *
   */
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(
      "Searching for venues in",
      location,
      "for",
      guests,
      "guests",
      dateRange
    );
  };
  return (
    <form
      onSubmit={handleSearch}
      className="bg-white shadow-lg p-4 m-4 border rounded-full flex flex-wrap gap-4 items-center justify-center">
      {/* Location input */}
      <div className="flex flex-col mr-4">
        <label className="text-sm font-semibold">Location</label>
        <input
          type="text"
          placeholder="Where to go"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="text-gray-500 text-sm outline-none"
        />
      </div>

      <div className="border-l h-10 mx-4" />

      {/* Check-in */}
      <div className="flex flex-col mr-4">
        <label className="text-sm font-semibold">Check In</label>
        <button
          type="button"
          onClick={() => setShowCalendar((prev) => !prev)}
          className="text-left text-gray-500 text-sm outline-none">
          {dateRange.from
            ? new Date(dateRange.from).toLocaleDateString()
            : "see Date"}
        </button>
      </div>

      <div className="border-l h-10 mx-4" />

      {/* Check-out */}
      <div className="flex flex-col mr-4">
        <label className="text-sm font-semibold">Check Out</label>
        <button
          type="button"
          onClick={() => setShowCalendar((prev) => !prev)}
          className="text-left text-gray-500 text-sm outline-none">
          {dateRange.to
            ? new Date(dateRange.to).toLocaleDateString()
            : "see Date"}
        </button>
      </div>

      <div className="border-l h-10 mx-4" />

      {/* Guests */}
      <div className="flex flex-col mr-4">
        <label className="text-sm font-semibold">Guest</label>
        <input
          type="number"
          min={1}
          placeholder="Add Guest"
          value={guests}
          onChange={(e) =>
            setGuests(Math.max(1, Number(e.target.value)))}
          className="text-gray-500 text-sm outline-none w-20"
        />
      </div>

      {/* Search Button */}
      <button
        type="submit"
        className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center ml-4">
        <Search />
      </button>

      {/* Calendar */}
      {showCalendar && (
        <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 z-50">
          <DatePicker
            range={dateRange}
            onSelect={(range) => {
              setDateRange(range);
              if (range.from && range.to) {
                setShowCalendar(false);
              }
            }}
          />
        </div>
      )}
    </form>
  );
};

export default VenueSearchForm;
