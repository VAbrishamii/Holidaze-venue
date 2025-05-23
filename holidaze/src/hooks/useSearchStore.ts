import { create } from "zustand";
import { Venue } from "@/Lib/types/venue";

type SearchStatus = "idle" | "pending" | "success" | "error";
/**
 * SearchStore interface to manage search results and status
 * - results: Array of Venue objects or null
 */
type SearchStore = {
  results: Venue[] | null;
  status: SearchStatus;

  setResults: (results: Venue[] | null) => void;
  setStatus: (status: SearchStatus) => void;
  reset: () => void;
};
/**
 * useSearchStore hook to manage search results and status using Zustand
 * - setResults: Function to set search results
 * - setStatus: Function to set search status
 * - reset: Function to reset search store
 */
export const useSearchStore = create<SearchStore>((set) => ({
  results: null,
  status: "idle",
  setResults: (results) => set({ results }),
  setStatus: (status) => set({ status }),
  reset: () => set({ results: null, status: "idle" }),
}));
