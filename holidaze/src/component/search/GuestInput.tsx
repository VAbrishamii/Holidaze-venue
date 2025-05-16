"use client";
import React, { useState, useEffect } from "react";

interface Props {
  guests: number;
  onChange: (value: number) => void;
  maxGuests?: number;
  label?: string;
  placeholder?: string;
  inputClassName?: string;
  wrapperClassName?: string;
}

/**
 * Guest input component
 * - Prevents invalid guest numbers
 * - Shows error for empty input or exceeding maxGuests
 */
const GuestInput: React.FC<Props> = ({ guests, onChange, maxGuests = 10, label= "Guest", placeholder="Add Guest", inputClassName="", wrapperClassName=""}) => {
  const [inputValue, setInputValue] = useState<string>(guests?.toString()?? "");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setInputValue(guests > 0 ? guests.toString() : "");
  }, [guests]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/^0+/, ""); // remove leading zeros

    // Allow clearing
    if (value === "") {
      setInputValue("");
      onChange(0);
      setError("Guest count is required");
      return;
    }

    const parsed = parseInt(value, 10);

    if (isNaN(parsed)) {
      setInputValue("");
      onChange(0);
      setError("Invalid number");
      return;
    }

    if (parsed > maxGuests) {
      setInputValue(""); // Clear input
      onChange(0);
      setError(`Max allowed is ${maxGuests} guests`);
    } else if (parsed < 1) {
      setInputValue("");
      onChange(0);
      setError("Minimum guest is 1");
    } else {
      setInputValue(parsed.toString());
      onChange(parsed);
      setError("");
    }
  };

  return (
  <div className={`flex flex-col ${wrapperClassName}`}>
      <label htmlFor="guest" className="text-sm font-semibold mb-1">
        {label}
      </label>
      <input
        id="guest"
        type="number"
        inputMode="numeric"
        min={1}
        max={maxGuests}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        className={`text-sm rounded-md px-3 py-2 text-gray-500 ${error ? "border-[var(--color-error)]" : "border-gray-300"} ${inputClassName}`}
      />
      {error && <p className="text-xs text-[var(--color-error)] mt-1">{error}</p>}
    </div>
  );
};

export default GuestInput;
