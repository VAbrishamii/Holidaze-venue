import { Venue } from "./venue";
import { BookingResponse } from "./booking"; 

/**
 * Basic user profile structure retunted from the API
 */
export interface Profile{
    name: string;
    email: string;
    bio?: string;
    venueManager?: boolean;
    avatar?: {
        url: string;
        alt?: string;
    };
    banner?: {
        url: string;
        alt?: string;
    };
}
/**
 * Full profile structure for either customer or manager.
 * Includes conditional `venues` and `bookings` arrays.
 */
export interface UserProfile extends Profile {
  venues?: Venue[];              // for venueManager=true
  bookings?: BookingResponse[];  // for customers
  _count?: {
    venues: number;
    bookings: number;
  };
}