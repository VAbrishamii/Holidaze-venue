"use client";
import React from "react";
import { DayPicker, DateRange} from "react-day-picker";
import "react-day-picker/dist/style.css";

/**
 * A date range object with optional from/to
 */
export interface BookingDateRange {
  from?: string;
  to?: string;
}

/**
 * Props for DateRangeSelector component
 */
interface DateRangeSelectorProps {
  dateRange: BookingDateRange;
  onChange: (range: BookingDateRange) => void;
}

/**
 * A calendar date range picker using react-day-picker
 */
const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({ dateRange, onChange }) => {
  const selected : DateRange = {
    from: dateRange?.from ? new Date(dateRange.from) : undefined,
    to: dateRange?.to ? new Date(dateRange.to) : undefined,
  };

  const handleSelect = (range: typeof selected | undefined) => {
    if (!range) return;
    onChange({
      from: range.from?.toISOString(),
      to: range.to?.toISOString(),
    });
  };

  return (
    <div className="flex flex-col mr-4">
      <label className="text-sm font-semibold">Date Range</label>
      <div className="p-2 border rounded-xl bg-white shadow-md">
        <DayPicker
          mode="range"
          selected={selected}
          onSelect={handleSelect}
          numberOfMonths={2}
        />
      </div>
    </div>
  );
};

export default DateRangeSelector;
