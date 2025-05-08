import { Media, VenueMeta, VenueLocation } from "./venue";

/**
 * represents a booking structure of a booking request
 * used in the booking creating and updating process
 * - id: unique identifier for the booking
 */
export interface BookingRequest {
  dateFrom: string;
  dateTo: string;
  guests: number;
  venueId: string;
}

/**
 * represent a single booking structure of a booking response from the API
 * used in all Get and Post responses
 */
export interface BookingResponse {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;

  venue: {
    id: string;
    name: string;
    description: string;
    media: Media[];
    maxGuests: number;
    rating: number;
    location: VenueLocation;
    price: number;
    meta: VenueMeta;
    owner: {
      name: string;
      email: string;
      bio: string;
      avatar: {
        url: string;
        alt?: string;
      };
    };
    customer: {
      name: string;
      email: string;
      avatar?: {
        url: string;
        alt?: string;
      };
    };
  };
}
/**
 * optional query parameters for booking filtering
 */
export interface BookingQueryParams {
  venue?: string;
  customer?: string;
}

/**
 * represents a booking ID, used in route params
 */
export type BookingId = string;
