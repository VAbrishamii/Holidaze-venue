"use client";

import { ButtonHTMLAttributes } from "react";

interface LoadMoreButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}
/**
 * A button that loads more items when clicked.
 * It can be used in a list or grid of items to load more items on demand.
 * It can also show a loading state when the items are being fetched.
 * It is a simple button with a loading state and a click handler.
 */
export default function LoadMoreButton({
  isLoading = false,
  ...props
}: LoadMoreButtonProps) {
  return (
    <button
      {...props}
      className={`px-4 py-2 text-white bg-[var(--color-darkgreen)] rounded-md  focus:outline-none focus:ring-2  cursor-pointer focus:ring-opacity-50 ${
        isLoading ? "cursor-not-allowed" : ""
      }`}
      disabled={isLoading}>
      {isLoading ? "Loading..." : "Load More"}
    </button>
  );
}
