import { useQuery } from "@tanstack/react-query";
import { getManagerVenue } from "@/Lib/api/venue";
import VenueCard from "../venues/VenueCard";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import PageLoader from "../ui/PageLoader";
import { deleteVenue } from "@/Lib/api/venue";

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

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (id: string) => deleteVenue(id),
    onSuccess: () => {
      toast.success("Venue deleted");
      queryClient.invalidateQueries({ queryKey: ["manager-venues"] });
    },
    onError: () => {
      toast.error("Failed to delete venue");
    },
  });
  /**
   * Handles deletion of a venue
   * @param id - ID of the venue to delete
   */
  function handleDelete(id: string) {
    if (confirm("Are you sure you want to delete this venue?")) {
      mutate(id);
    }
  }

  if (isLoading)
    return (
      <div className="text-gray-600">
        <PageLoader />
      </div>
    );
  if (isError)
    return <p className="text-red-500">Could not load your venues.</p>;

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
          <div key={venue.id} className="relative group">
            <VenueCard venue={venue} />
            {/* Actions */}
            <div className="absolute top-2 right-2 flex flex-col bg-white p-2 rounded-2xl gap-2">
              <Link href={`/venues/${venue.id}/edit`}>
                <Pencil className="w-4 h-4 text-[var(--color-darkgreen)] cursor-pointer" />
              </Link>
              <button onClick={() => handleDelete(venue.id)}>
                <Trash2 className="w-4 h-4 text-[var(--color-secondary)] cursor-pointer" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
