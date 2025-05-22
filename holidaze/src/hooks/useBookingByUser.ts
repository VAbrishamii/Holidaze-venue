import { useQuery } from "@tanstack/react-query";
import { getBookingsByProfile } from "@/Lib/api/profile";

/**
 * Custom hook to fetch bookings by user profile name
 */

export function useBookingByUser(name: string, enabled: boolean) {
  return useQuery({
    queryKey: ["bookings", name],
    queryFn: async () => {
      const res = await getBookingsByProfile(name);
      return res;
    },
    enabled: !!name && enabled,
  });
}
