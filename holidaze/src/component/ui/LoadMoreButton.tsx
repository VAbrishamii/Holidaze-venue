"use client";

import { ButtonHTMLAttributes } from "react";

interface LoadMoreButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

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
        disabled={isLoading}
        >
        {isLoading ? "Loading..." : "Load More"}
        </button>
    );
    }