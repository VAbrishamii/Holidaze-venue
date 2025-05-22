"use client";
import React from "react";
import { useId } from "react";

interface Props {
  value: string | undefined;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  inputClassName?: string;
  wrapperClassName?: string;
}

/**
 * Location input component for location search.
 * Accepting city, country or both as props.
 */
const LocationInput: React.FC<Props> = ({
  value,
  onChange,
  label = "Location",
  placeholder = " Search your Destination, City or Country",
  inputClassName = "",
  wrapperClassName = "",
}) => {
  const id = useId();
  return (
    <div className={`flex flex-col ${wrapperClassName}`}>
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
      </label>
      <input
        id={id}
        type="text"
        placeholder={placeholder}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className={`text-sm outline-none rounded-md py-1 ${inputClassName}`}
      />
    </div>
  );
};

export default LocationInput;
