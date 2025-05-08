"use client";
import React, { useRef, useState, useEffect } from "react";
import { DayPicker, DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";

/**
 * interface for BookingDateRange
 * - from: The start date of the booking range
 * - to: The end date of the booking range
 */
export interface BookingDateRange {
  from?: string;
  to?: string;
}
/**
 * interface for DateRangeSelectorProps
 * - dateRange: The current date range selected
 * - onChange: Callback function to handle date range changes
 */
interface DateRangeSelectorProps {
  dateRange: BookingDateRange;
  onChange: (range: BookingDateRange) => void;
  disabledDates?: Date[]; // Optional prop to disable specific dates
}
/**
 * date range selector component
 * - Displays two date inputs for check-in and check-out dates
 * - Uses react-day-picker for date selection
 * - Handles click outside to close the calendar
 */
const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({
  dateRange,
  onChange,
  disabledDates = [],
}) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  const selected: DateRange = {
    from: dateRange?.from ? new Date(dateRange.from) : undefined,
    to: dateRange?.to ? new Date(dateRange.to) : undefined,
  };
  /**
   *
   * handleSelect function to update the selected date range
   */
  const handleSelect = (range: typeof selected | undefined) => {
    if (!range) return;
    onChange({
      from: range.from?.toISOString(),
      to: range.to?.toISOString(),
    });
    if (range.from && range.to) {
      setShowCalendar(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setShowCalendar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  /**
   * * handleClick function to toggle the calendar visibility
   */
  return (
    <div className="relative flex items-center gap-6 mr-4 ">
      {/* Check In */}
      <div onClick={() => setShowCalendar(true)} className="cursor-pointer">
        <label className="text-sm font-semibold block">Check In</label>
        <span className="text-gray-500 text-sm block min-w-[90px]">
          {selected.from
            ? new Date(selected.from).toLocaleDateString()
            : "see Date"}
        </span>
      </div>

      {/* Divider */}
      <div className="border-l h-10" />

      {/* Check Out */}
      <div onClick={() => setShowCalendar(true)} className="cursor-pointer">
        <label className="text-sm font-semibold block">Check Out</label>
        <span className="text-gray-500 text-sm block min-w-[90px]">
          {selected.to
            ? new Date(selected.to).toLocaleDateString()
            : "see Date"}
        </span>
      </div>

      {/* Calendar */}
      {showCalendar && (
        <div
          ref={calendarRef}
          className="absolute top-full mt-2 left-1/2 -translate-x-1/2 z-50 bg-white p-4 rounded-xl border shadow-xl"
          style={{ minWidth: "320px", maxWidth: "100%" }}>
          <DayPicker
            mode="range"
            selected={selected}
            onSelect={handleSelect}
            numberOfMonths={1}
            disabled={[{ before: new Date() }, ...(disabledDates ?? [])]}
            modifiersClassNames={{
              today: "rdp-day-today",
              selected: "rdp-day-selected",
              disabled: "rdp-day-disabled",
              range_start: "rdp-day-start",
              range_end: "rdp-day-end",
              range_middle: "rdp-day-middle",
            }}
            classNames={{
              root: "text-sm",
              day: "rounded-full w-9 h-9 transition-colors",
              nav_button:
                "text-[var(--color-primary)] hover:text-[var(--color-secondary)]",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default DateRangeSelector;
