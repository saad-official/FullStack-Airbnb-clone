"use client";
import ListingHead from "@/app/components/listing/ListingHead";
import ListingInfo from "@/app/components/listing/ListingInfo";
import { categories } from "@/app/components/navbar/Categories";
import { SafeListing, SafeUser } from "@/app/types";
import { Reservation } from "@prisma/client";
import React, { useMemo } from "react";

interface ListingClientProps {
  reservations?: Reservation[];
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser: SafeUser | null;
}

const ListingClient = ({
  reservations,
  listing,
  currentUser,
}: ListingClientProps) => {
 const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing.category]);

  return (
    <div className="max-w-screen-lg mx-auto">
      <ListingHead
        title={listing.title}
        imageSrc={listing.imageSrc}
        locationValue={listing.locationValue}
        id={listing.id}
        currentUser={currentUser}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10 mt-6">
        <ListingInfo
          user={listing.user}
          category={category}
          description={listing.description}
          roomCount={listing.roomCount}
          guestCount={listing.guestCount}
          bathroomCount={listing.bathroomCount}
          locationValue={listing.locationValue}
        />
      </div>
    </div>
  );
};

export default ListingClient;
