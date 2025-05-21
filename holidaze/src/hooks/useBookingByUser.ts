import { useQuery } from "@tanstack/react-query";
import { getBookingsByProfile } from "@/Lib/api/profile";

/**
 * Custom hook to fetch bookings by user profile name
 */
// export function useBookingsByUser(name: string) {
//   return useQuery<UserProfile["bookings"]>({
//     queryKey: ["bookings", name],
//     queryFn: () => getBookingsByProfile(name),

//     enabled: !!name, // Avoid fetching if username is empty
//   });
// }
export function useBookingByUser(name: string, enabled: true) {
  return useQuery({
    queryKey: ["bookings", name],
    queryFn: async () => {
      const res = await getBookingsByProfile(name);
      return res;
    },
    enabled: !!name && enabled, 
  });
}
