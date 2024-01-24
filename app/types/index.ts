import { Listings, Reservation, User } from "@prisma/client";

export type ListingType = Listings;

export type ReservationType = Reservation & {
  listing: Listings;
};

export type SafeUser = User;

