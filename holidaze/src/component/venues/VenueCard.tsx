"use client";
import { Venue } from "@/Lib/types/venue";
import Link from "next/link";
import { Star } from "lucide-react";
import { VenueFromBooking } from "@/Lib/types/venue";
import SmartImage from "../ui/SmartImage";

type Props = {
  venue: Venue | VenueFromBooking;
};

/**
 * A card component that displays venue information.
 * It includes an image, location, price, max guests, and rating.
 * The card is clickable and navigates to the venue details page.
 */
export default function VenueCard({ venue }: Props) {
  const hasImage = !!venue.media?.[0]?.url;
  const image = hasImage
    ? venue.media[0].url
    : "https://via.placeholder.com/400x240?text=No+Image+Available";

  return (
    <Link href={`/venues/${venue.id}`}>
      <div className="w-full max-w-[320px] mx-auto cursor-pointer rounded-2xl  overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out ">
        {hasImage ? (
          <SmartImage
            src={image}
            alt={venue.name}
            width={400}
            height={240}
            priority
            className="w-full h-60 object-cover"
            fallback
          />
        ) : (
          <div className="w-full h-60 bg-gray-200 flex items-center justify-center text-gray-600 text-sm">
            No Image Available
          </div>
        )}
        <div className="p-4 space-y-1 text-gray-800">
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium">
              Location: {venue.location.country || "N/A"}
            </p>
            <div className="flex items-center gap-1">
              <span className="text-sm font-semibold">{venue.rating}</span>
              <Star className="w-4 h-4 fill-[var(--color-yellow)] text-[var(--color-yellow)]" />
            </div>
          </div>

          <p className="text-sm">Price: ${venue.price}</p>
          <p className="text-sm">Max Guests: {venue.maxGuests}</p>
        </div>
      </div>
    </Link>
  );
}
