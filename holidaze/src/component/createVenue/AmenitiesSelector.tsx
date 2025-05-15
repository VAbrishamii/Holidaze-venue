"use client";

import { Wifi, Coffee, Car, PawPrint } from "lucide-react";

type Amenities = {
  wifi: boolean;
  breakfast: boolean;
  parking: boolean;
  pets: boolean;
};
interface Props {
  value: Amenities;
  onChange: (value: Amenities) => void;
}
/**
 * A toggle-style component for selecting venue amenities.
 * Includes wifi, breakfast, parking, and pets.
 */
export default function AmenitiesSelector({ value, onChange }: Props) {
  const toggleAmenity = (key: keyof Amenities) => {
    onChange({ ...value, [key]: !value[key] });
  };

  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="text-sm font-semibold">Amenities</legend>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <AmenityToggle
          label="Wi-Fi"
          icon={<Wifi className="w-5 h-5" />}
          selected={value.wifi}
          onClick={() => toggleAmenity("wifi")}
        />
        <AmenityToggle
          label="Breakfast"
          icon={<Coffee className="w-5 h-5" />}
          selected={value.breakfast}
          onClick={() => toggleAmenity("breakfast")}
        />
        <AmenityToggle
          label="Parking"
          icon={<Car className="w-5 h-5" />}
          selected={value.parking}
          onClick={() => toggleAmenity("parking")}
        />
        <AmenityToggle
          label="Pets Allowed"
          icon={<PawPrint className="w-5 h-5" />}
          selected={value.pets}
          onClick={() => toggleAmenity("pets")}
        />
      </div>
    </fieldset>
  );
}

function AmenityToggle({
  label,
  icon,
  selected,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      aria-label={label}
      onClick={onClick}
      className={`flex flex-col items-center p-2 rounded-lg border text-sm transition focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] ${
        selected
          ? "bg-[var(--color-secomdary)] border-[var(--color-secondary)] text-[var(--color-secondary)]"
          : "border-gray-300 text-gray-600 hover:bg-gray-100"
      }`}>
      {icon}
      <span className="mt-1">{label}</span>
    </button>
  );
}
