import { filterVenues } from "../utils/filterVenue";
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
} from "@/Lib/types/venue";

/**
 * * Fetch all venues with optional search parameters
 * @param params - Search parameters
 */
export async function getAllVenues(
  params?: SearchVenueParams
): Promise<VenueListResponse> {
  try {
    const response = await axiosInstance.get("holidaze/venues", {
      params,
    });
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
    const response = await axiosInstance.get(`holidaze/venues/${id}`, {
      params: {
        _owner: include?.owner ?? false,
        _bookings: include?.bookings ?? false,
      },
    });

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
    const user = JSON.parse(localStorage.getItem("user") || "{}");

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
  try {
    const response = await axiosInstance.get("/holidaze/venues", {
      params: { _bookings: true },
    });

    const venues = response.data.data;
    const filtered = filterVenues(venues, params);
    return filtered;
  } catch (error) {
    console.error("Failed to search venues", error);
    throw error;
  }
}
/**
 * * Fetch all venues managed by a specific manager
 * @param name - Manager's name
 */
export async function getManagerVenue(name: string) {
  try {
    const response = await axiosInstance.get(
      `/holidaze/profiles/${name}/venues`
    );
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch manager venue", error);
    throw error;
  }
}
