/**
 * @holidaze/types/venue
 * @description Types for Venue data structures
 */
export type VenueMeta = {
  wifi: boolean;
  parking: boolean;
  breakfast: boolean;
  pets: boolean;
};

export type VenueLocation = {
  address?: string;
  city?: string;
  zip?: string;
  country?: string;
  continent?: string;
  lat?: number;
  lng?: number;
};
export interface Booking {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
  customer: {
    name: string;
    email: string;
  };
}
export interface Media {
  url: string;
  alt?: string;
}
export type ApiMeta = {
  isFirstPage: boolean;
  isLastPage: boolean;
  currentPage: number;
  previousPage: number | null;
  nextPage: number | null;
  pageCount: number;
  totalCount: number;
};
/**
 * * Venue and deatails data structures
 */
export interface Venue {
  id: string;
  name: string;
  description: string;
  media: Media[];
  maxGuests: number;
  rating: number;
  location: VenueLocation;
  price: number;
}
export interface VenueDetails extends Venue {
  price: number;
  meta: VenueMeta;
  bookings: Booking[];
  created: string;
  updated: string;
  owner: {
    name: string;
    email: string;
    avatar?: {
      url: string;
      alt?: string;
    };
  };
}
/**
 * create , update and search data structures for Venue
 */

export interface CreateVenueData {
  name: string;
  description: string;
  price: number;
  maxGuests: number;
  location?: VenueLocation;
  media?: Media[];
  meta?: VenueMeta;
}

export interface UpdateVenueData {
  name?: string;
  description?: string;
  price?: number;
  maxGuests?: number;
  location?: VenueLocation;
  media?: Media[];
  meta?: VenueMeta;
}
export interface SearchVenueParams {
  city?: string;
  country?: string;
  maxGuests?: number;
  rating?: number;
  limit?: number;
  page?: number;
  dateFrom?: string;
  dateTo?: string;
  _owner?: boolean;
  _bookings?: boolean;
}
/**
 * * API response types for Venue and data structures
 */
export interface VenueListResponse {
  data: Venue[];
  meta?: ApiMeta;
}
export interface VenueDetailsResponse {
  data: VenueDetails;
  meta: ApiMeta;
}
export interface VenueCreateResponse {
  data: CreateVenueData;
  meta: ApiMeta;
}
export interface VenueUpdateResponse {
  data: UpdateVenueData;
  meta: ApiMeta;
}
