"use client";
import React from "react";
import { DayPicker,DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";


/**
 * date range interface (dates from API are srtings)
 */
export interface BookingDateRange {
  from?: string;
  to?: string;
}


/**
 * datePicker component for the calendar
 */
interface DatePickerProps {
  range?: BookingDateRange;
  onSelect?: (date: BookingDateRange) => void;
}
/**
 * DatePicker component displays a calendar for selecting a check-in and check-out date range.
 */
const DatePicker: React.FC<DatePickerProps> = ({ range, onSelect }) => {
  // Converts API dates (strings) to Date objects for calendar use.
  const selected: DateRange = {
    from: range?.from ? new Date(range.from) : undefined,
    to: range?.to ? new Date(range.to) : undefined,
  };

  /**
   * Handles date selection from the calendar.
   */
  const handleSelect = (selectedRange: DateRange | undefined) => {
    if (!onSelect) return;
    onSelect({
      from: selectedRange?.from?.toISOString(),
      to: selectedRange?.to ?.toISOString(),
    });
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-xl border">
      <DayPicker
        mode="range"
        selected={selected}
        onSelect={handleSelect}
        numberOfMonths={2}
      />
    </div>
  );
};

export default DatePicker;
