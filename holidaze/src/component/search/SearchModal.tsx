"use client";
import React from "react";
import { X } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}
/**
 * a modal that contains the search form for venues, used on small screens
 */
export default function SearchModal({ isOpen, onClose, children }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 p-3 flex items-center justify-center  bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <X className="h-6 w-6" />
        </button>
        {children}
      </div>
    </div>
  );
}
