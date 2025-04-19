"use client";
import { Venue } from "@/Lib/types/venue";
import Link from "next/link";
import { Star } from "lucide-react";

type Props = {
  venue: Venue;
};

/**
 * VenueCard component for displaying venue information
 */

export default function VenueCard({ venue }: Props) {
  const image = venue.media[0]?.url || "/images/placeholder.png";

  return (
    <Link href={`/venues/${venue.id}`}>
      <div className="cursor-pointer rounded-2xl  overflow-hidden hover:shadow-lg transition">
        {image && (
          <img
            src={image}
            alt={venue.name}
            className="w-full h-60 object-cover"
          />
        )}
        <div className="p-4 space-y-1 text-gray-800">
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium">
              Location: {venue.location.country || "N/A"}
            </p>
            <div className="flex items-center gap-1">
              <span className="text-sm font-semibold">{venue.rating}</span>
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            </div>
          </div>

          <p className="text-sm">Price: ${venue.price}</p>
          <p className="text-sm">Max Guests: {venue.maxGuests}</p>
        </div>
      </div>
    </Link>
  );
}
