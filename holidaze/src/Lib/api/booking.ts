import {
  BookingRequest,
  BookingResponse,
  BookingId,
  BookingQueryParams,
} from "@/Lib/types/booking";

import axiosInstance from "./axiosInstance";
import axios from "axios";

/**
 * Create a new booking
 */
export async function createBooking(
  data: BookingRequest
): Promise<BookingResponse> {
  try {
    const response = await axiosInstance.post("holidaze/bookings", data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const message =
        error.response?.data?.errors?.[0]?.message ||
        error.response?.data?.message ||
        error.message;

      console.error(` Booking failed [${status}]: ${message}`);
      throw new Error(message); // you can also toast it here
    } else {
      console.error(" Unknown booking error", error);
      throw error;
    }
  }
}
/**
 * Get single booking by ID
 */
export async function getBookingById(id: BookingId): Promise<BookingResponse> {
  try {
    const response = await axiosInstance.get(`holidaze/bookings/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch booking by ID", error);
    throw error;
  }
}
/**
 * * Get all bookings with optional query parameters
 */
export async function getAllBookings(
  filters?: BookingQueryParams
): Promise<BookingResponse[]> {
  try {
    const response = await axiosInstance.get("holidaze/bookings", {
      params: filters,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch all bookings", error);
    throw error;
  }
}
/**
 * * * Update a booking by ID
 */
export async function updateBooking(
  id: BookingId,
  data: BookingRequest
): Promise<BookingResponse> {
  try {
    const response = await axiosInstance.put(`holidaze/bookings/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Failed to update booking", error);
    throw error;
  }
}
/**
 * * Delete a booking by ID
 */
export async function deleteBooking(id: BookingId): Promise<void> {
  try {
    const response = await axiosInstance.delete(`holidaze/bookings/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to delete booking", error);
    throw error;
  }
}
