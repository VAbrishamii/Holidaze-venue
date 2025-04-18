/**
 * @file venue.d.ts
 * @description This file contains the TypeScript interface for the Venue object.
 */
export interface Venue {
    id: string;
    name: string;
    description: string;
    media: {
      url: string;
      alt: string;
    }[];
    price: number;
    maxGuests: number;
    rating: number;
    created: string;
    updated: string;
    meta: {
      wifi: boolean;
      parking: boolean;
      breakfast: boolean;
      pets: boolean;
    };
    location: {
      address: string;
      city: string;
      zip: string;
      country: string;
      continent: string;
      lat: number;
      lng: number;
    };
    owner: {
      name: string;
      email: string;
      bio: string;
      avatar: {
        url: string;
        alt: string;
      };
      banner: {
        url: string;
        alt: string;
      };
    };
  }
  