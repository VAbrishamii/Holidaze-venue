import { getVenueById } from "@/Lib/api/venue";
import { VenueDetails } from "@/Lib/types/venue";
import { Star } from "lucide-react";
import ImageCarousel from "@/component/ui/ImageCarousel";
import BookingBox from "@/component/booking/BookingBox";
import SmartImage from "@/component/ui/SmartImage";

/**
 * Server component for the venue details page.
 */

export default async function VenueDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  try {
    const data = await getVenueById(id, { owner: true, bookings: true });
    console.log("venue data", data);
    const venue: VenueDetails = data.data;

    const isGuestFavorite = venue.rating === 5 && venue.bookings.length > 5;

    return (
      <div className="max-w-6xl mx-auto  px-4 sm:px-6 md:px-8 py-4">
        <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
          {venue.name}
        </h1>

        {/* Images */}
        <ImageCarousel images={venue.media} />

        <div className="flex items-center gap-2 mb-4">
          <span className="flex items-center text-[var(--color-yellow)] p-2 gap-1">
            <Star className="w-5 h-5 fill-[var(--color-yellow)]" />{" "}
            {venue.rating}
          </span>
          {isGuestFavorite && (
            <span className="ml-2 text-sm  text-[var(--color-secondary)] font-semibold">
              Guest Favorite
            </span>
          )}
        </div>

        {/* Split layout: Left = details, Right = booking box */}
        <div className="mt-6 flex flex-col md:flex-row gap-6">
          {/* Left side: venue info (2 columns) */}
          <div className="w-full md:w-2/3 ">
            <p className="text-[var(--color-textdark)] font-bold mb-2 ">
              {venue.description}
            </p>
            <p className="text-sm text-[var(--color-textdark)] mb-4">
              Price: ${venue.price}
            </p>
            <p className="text-sm text-[var(--color-textdark)] mb-4">
              Max Guests: {venue.maxGuests}
            </p>

            <div className="grid grid-cols gap-2 text-sm text-gray-700">
              <p>
                <strong>Country:</strong> {venue.location.country}
              </p>
              <p>
                <strong>City:</strong> {venue.location.city}
              </p>
              <p>
                <strong>Address:</strong> {venue.location.address}
              </p>
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2">Amenities:</h2>
              <ul className="list-disc list-inside text-sm text-gray-700">
                {venue.meta.wifi && <li>Wi-Fi</li>}
                {venue.meta.parking && <li>Parking</li>}
                {venue.meta.breakfast && <li>Breakfast</li>}
                {venue.meta.pets && <li>Pets Allowed</li>}
              </ul>
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2">Hosted By: </h2>
              <div className="flex items-center gap-4">
                <SmartImage
                  src={venue.owner.avatar?.url || "/images/default-avatar.png"}
                  alt={venue.owner.avatar?.alt || venue.owner.name}
                  width={30}
                  height={30}
                  className="w-10 h-10 rounded-full"
                />
                {/* <img
                  src={venue.owner.avatar?.url || "/images/default-avatar.png"}
                  alt={venue.owner.avatar?.alt || venue.owner.name}
                
                  className="w-10 h-10 rounded-full"
                /> */}
                <p className="text-[var(--color-secondary)]">
                  {venue.owner.name}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2">Bookings</h2>
              <p className="text-sm text-gray-600">
                Booked {venue.bookings.length} time
                {venue.bookings.length !== 1 && "s"} by guests
              </p>
            </div>
          </div>

          {/* Right side: BookingBox */}
          <div className="w-full md:w-1/2 relative lg:sticky lg:top-28 lg:self-start">
            <BookingBox venue={venue} />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Failed to load venue:", error);
    return (
      <p className="text-center text-red-500">Failed to load venue data.</p>
    );
  }
}
