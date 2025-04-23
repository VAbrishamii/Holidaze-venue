import { CloudLightning } from "lucide-react";
import axiosInstance from "./axiosInstance";
import {
  VenueDetailsResponse,
  VenueListResponse,
  CreateVenueData,
  UpdateVenueData,
  VenueCreateResponse,
  VenueUpdateResponse,
  SearchVenueParams,
  Venue,
  Booking,
} from "@/Lib/types/venue";

/**
 * Helper function to build query string from object
 */
function buildQueryParams<T extends Record<string, any>>(params?: T): string {
  if (!params) return "";
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, value.toString());
    }
  });
  return `?${searchParams.toString()}`;
}
/**
 * * Fetch all venues with optional search parameters
 * @param params - Search parameters
 */
export async function getAllVenues(
  params?: SearchVenueParams
): Promise<VenueListResponse> {
  try {
    const queryString = buildQueryParams(params);
    const response = await axiosInstance.get(`holidaze/venues${queryString}`);
    console.log("all venues response", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch venues", error);
    throw error;
  }
}
/**
 * * Fetch a single venue by ID
 * @param id - Venue ID
 */
export async function getVenueById(
  id: string,
  include?: { owner?: boolean; bookings?: boolean }
): Promise<VenueDetailsResponse> {
  try {
    const query = buildQueryParams({
      _owner: include?.owner ?? false,
      _bookings: include?.bookings ?? false,
    });
    const response = await axiosInstance.get(`holidaze/venues/${id}${query}`);

    return response.data;
  } catch (error) {
    console.error("Failed to fetch venue by ID", error);
    throw error;
  }
}
/**
 * * Create a new venue
 */
export async function createVenue(
  data: CreateVenueData
): Promise<VenueCreateResponse> {
  try {
    const response = await axiosInstance.post("holidaze/venues", data);
    return response.data;
  } catch (error) {
    console.error("Failed to create venue", error);
    throw error;
  }
}
/**
 * * Update an existing venue by ID
 */
export async function updateVenue(
  id: string,
  data: UpdateVenueData
): Promise<VenueUpdateResponse> {
  try {
    const response = await axiosInstance.put(`holidaze/venues/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Failed to update venue", error);
    throw error;
  }
}
/**
 * * * Delete a venue by ID
 */
export async function deleteVenue(id: string): Promise<void> {
  try {
    const response = await axiosInstance.delete(`holidaze/venues/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to delete venue", error);
    throw error;
  }
}
/**
 * Search venues using custom query params (city, guests, rating, etc.)
 */
export async function searchVenues(
  params: SearchVenueParams
): Promise<Venue[]> {
  console.log("search params", params);
  try {
    const city = params.city ?? "";
    const country = params.country ?? "";
    const location = city ? `${city}, ${country}` : country;

    const queryParams = buildQueryParams({ _bookings: true });

    const response = await axiosInstance.get(
      `/holidaze/venues/search?q=${location}${queryParams}`
    );
    console.log("search venues response", response.data);
    type VenueWithbookings = Venue & {
      bookings?: Booking[];
    };
    const venues = response.data.data as VenueWithbookings[];
    console.log("search venues response", venues);
    // filter by guests and date range
    const filtered = venues.filter((venue) => {
      const matchesGuests = params.maxGuests
        ? venue.maxGuests >= params.maxGuests
        : true;

      const isAvailable =
        params.dateFrom && params.dateTo
          ? (venue.bookings?.every((booking) => {
              const bookingFrom = new Date(booking.dateFrom);
              const bookingTo = new Date(booking.dateTo);
              const from = new Date(params.dateFrom!);
              const to = new Date(params.dateTo!);

              return to <= bookingFrom || from >= bookingTo;
            }) ?? true)
          : true;

      return matchesGuests && isAvailable;
    });

    return filtered;
  } catch (error) {
    console.error("Error searching venues:", error);
    throw error;
  }
}
