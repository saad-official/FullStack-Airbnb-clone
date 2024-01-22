import { Listings, Reservation, User } from "@prisma/client";

export type SafeListing = Omit<Listings, "createdAt"> & {
  createdAt: string;
};

export type ReservationType = Reservation & {
  listing: Listings;
};


export type SafeReservation = Omit<
  Reservation,
  "createdAt" | "startDate" | "endDate" | "listing"
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  listing: SafeListing;
};

export type SafeUser = User & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};
