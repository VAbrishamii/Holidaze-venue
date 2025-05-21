import axiosInstance from "./axiosInstance";
import { UserProfile } from "../types/profile";
/**
 * Fetch a user profile by name
 */
export async function getProfileByName(name: string): Promise<UserProfile> {
  try {
    const response = await axiosInstance.get(`holidaze/profiles/${name}`, {
      params: {
        _bookings: true,
        _venues: true,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to fetch profile by name", error);
    throw error;
  }
}
/**
 * Fetch bookings by profile name
 */
export async function getBookingsByProfile(
  name: string
  
): Promise<UserProfile["bookings"]> {
  try {
    const response = await axiosInstance.get(
      `holidaze/profiles/${name}/bookings?_venue=true`,
      {}
      
    );
    console.log('name of the profile', name);
    console.log("booked", response.data);
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch bookings by profile", error);
    throw error;
  }
}
/**
 * Fetch venues by profile name
 */
export async function getVenuesByProfile(
  name: string
): Promise<UserProfile["venues"]> {
  try {
    const response = await axiosInstance.get(
      `holidaze/profiles/${name}/venues`,
      {}
    );

    return response.data;
  } catch (error) {
    console.error("Failed to fetch venues by profile", error);
    throw error;
  }
}
/**
 * Update a user profile
 */
export async function updateProfile(
  name: string,
  data: {
    avatar?: { url: string; alt?: string };
    banner?: { url: string; alt?: string };
  }
): Promise<UserProfile> {
  try {
    const response = await axiosInstance.put(`holidaze/profiles/${name}`, data);
    return response.data;
  } catch (error) {
    console.error("Failed to update profile", error);
    throw error;
  }
}
