import { useQuery } from "@tanstack/react-query";
import { getBookingsByProfile } from "@/Lib/api/profile";
import { UserProfile } from "@/Lib/types/profile";

/**
 * Custom hook to fetch bookings by user profile name
 */
export function useBookingsByUser(username: string) {
  return useQuery<UserProfile["bookings"]>({
    queryKey: ["bookings", username],
    queryFn: () => getBookingsByProfile(username),
    enabled: !!username, // Avoid fetching if username is empty
  });
}
