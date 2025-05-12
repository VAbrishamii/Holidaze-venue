import axiosInstance from "./axiosInstance";
import { UserProfile } from "../types/profile";

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

export async function getBookingsByProfile(
  name: string
): Promise<UserProfile["bookings"]> {
  try {
    const response = await axiosInstance.get(
      `holidaze/profiles/${name}/bookings`,
      {}
    );

    return response.data;
  } catch (error) {
    console.error("Failed to fetch bookings by profile", error);
    throw error;
  }
}

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

export async function updateProfile(
  name: string, // name of the profile to update
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
