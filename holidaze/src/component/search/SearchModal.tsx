"use client";
import React from "react";
import { X } from "lucide-react";
import VenueSearchForm from "./VenueSearch";

interface Props {
  isOpen: boolean;
    onClose: () => void;
}
/**
 * a modal that contains the search form for venues, used on small screens
 */
export default function SearchModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-background-dark rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-6 w-6" />
        </button>
        <VenueSearchForm onSearch={onClose} />
      </div>
    </div>
  );
}