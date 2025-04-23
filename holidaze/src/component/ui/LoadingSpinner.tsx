import React from "react";
/**
 * A spinning loader SVG that supports size and color via props.
 */

export default function LoadingSpinner({
  size = 16,
  color = "#ff6b44",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg
      className="animate-spin"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none">
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        style={{ stroke: color, opacity: 0.25 }}
        strokeWidth="4"
      />
      <path
        style={{ fill: color, opacity: 0.75 }}
        fill={color}
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}
