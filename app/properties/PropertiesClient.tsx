"use client";
import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { ListingType, ReservationType, SafeUser } from "../types";
import Container from "../components/Container";
import Heading from "../components/Heading";
import axios from "axios";
import toast from "react-hot-toast";
import ListingsCard from "../components/listing/ListingsCard";

interface PropertiesClientProps {
  listings: ListingType[];
  currentUser?: SafeUser | null;
}

const PropertiesClient = ({ listings, currentUser }: PropertiesClientProps) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/listing/${id}`)
        .then(() => {
          toast.success("Listing Deleted");
          router.refresh();
        })
        .catch((error: any) => {
          toast.error(error?.response?.data?.error || "Something Went Wrong");
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading title="Properties" subtitle="List of your Properties" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => (
          <ListingsCard
            data={listing}
            key={listing.id}
            actionId={listing.id}
            onAction={onCancel}
            disabled={deletingId === listing.id}
            actionLabel="Delete Property"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default PropertiesClient;
