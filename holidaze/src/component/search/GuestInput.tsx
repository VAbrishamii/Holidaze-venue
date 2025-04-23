import React from "react";

interface Props {
  guests: number | null;
  onChange: (value: number) => void;
}
/**
 * Guest input component for the search form

 */

export default function GuestInput({ guests, onChange }: Props) {
  return (
    <div className="flex flex-col mr-4">
      <label className="text-sm font-semibold">Guest</label>
      <input
        type="number"
        min={1}
        value={guests ?? ""}
        onChange={(e) => onChange(Math.max(1, Number(e.target.value)))}
        className="text-gray-500 text-sm outline-none w-20"
      />
    </div>
  );
}
