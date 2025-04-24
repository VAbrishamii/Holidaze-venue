// import React from "react";

// interface Props {
//   guests: number | null;
//   onChange: (value: number) => void;
// }
// /**
//  * Guest input component for the search form

//  */

// export default function GuestInput({ guests, onChange }: Props) {
//   return (
//     <div className="flex flex-col mr-4">
//       <label className="text-sm font-semibold">Guest</label>
//       <input
//         type="text"
//         placeholder="Add guests"
//         value={guests ?? ""}
//         onChange={(e) => onChange(Math.max(1, Number(e.target.value)))}
//         className="text-gray-500 text-sm outline-none w-20 hover:cursor-pointer"
//       />
//     </div>
//   );
// }
import React from "react";

interface Props {
  guests: number;
  onChange: (value: number) => void;
}

/**
 * Guest input component for the search form.
 * - Handles number input
 * - Prevents 0 guests
 * - Allows clearing and retyping
 */
const GuestInput: React.FC<Props> = ({ guests, onChange }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // If input is empty, treat as 0 so form validation can handle it
    if (value === "") {
      onChange(0);
      return;
    }

    const parsed = parseInt(value, 10);
    if (!isNaN(parsed)) {
      onChange(parsed);
    }
  };

  return (
    <div className="flex flex-col mr-4">
      <label className="text-sm font-semibold">Guests</label>
      <input
        type="number"
        min={1}
        placeholder="Add Guest"
        value={guests === 0 ? "" : guests}
        onChange={handleInputChange}
        className="text-gray-500 text-sm outline-none w-20 px-2 py-1 rounded-md"
      />
    </div>
  );
};

export default GuestInput;

