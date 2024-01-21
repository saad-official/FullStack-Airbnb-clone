import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingsById from "@/app/actions/getListingsById";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import React from "react";
import ListingClient from "./ListingClient";
import getReservation from "@/app/actions/getReservation";

interface IParams {
  listingId: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingsById(params);
  console.log("first", listing)
  const currentUser = await getCurrentUser();
  const reservation = await getReservation(params);

  if (!listing) {
    <ClientOnly>
      <EmptyState />
    </ClientOnly>;
  }

  return (
    <ClientOnly>
      <ListingClient reservations={reservation} listings={listing} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default ListingPage;
