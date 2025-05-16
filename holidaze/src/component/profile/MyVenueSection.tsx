import { useQuery } from "@tanstack/react-query";
import { getManagerVenue } from "@/Lib/api/venue";
import VenueCard from "../venues/VenueCard";

interface Props {
    username: string;
}
/**
 * Fetches and displays venues created by the current venue manager.
 */
export default function MyVenuesSection({ username }: Props) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["manager-venues", username],
    queryFn: () => getManagerVenue(username),
    enabled: !!username,
  });

  if (isLoading) return <p className="text-gray-600">Loading your venues...</p>;
  if (isError) return <p className="text-red-500">Could not load your venues.</p>;

  if (!data || data.length === 0) {
    return (
      <div className="border p-4 rounded-md text-gray-600">
        You haven’t created any venues yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Your Venues</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((venue: any) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </div>
    </div>
  );
}
