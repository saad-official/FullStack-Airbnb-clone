"use client";
import ListingHead from "@/app/components/listing/ListingHead";
import ListingInfo from "@/app/components/listing/ListingInfo";
import ListingReservation from "@/app/components/listing/ListingReservation";
import { categories } from "@/app/components/navbar/Categories";
import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeUser, ListingType } from "@/app/types";
import { Range } from "react-date-range";
import { Reservation } from "@prisma/client";
import axios from "axios";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import React,  { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface ListingClientProps {
  reservations?: Reservation[];
  listings: ListingType & {
    user: SafeUser;
  };
  currentUser: SafeUser | null;
}

const ListingClient = ({
  reservations = [],
  listings,
  currentUser,
}: ListingClientProps) => {
  console.log("res", reservations);
  const loginModal = useLoginModal();
  const router = useRouter();

  const disableDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listings?.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(dateRange.endDate, dateRange.startDate);

      if (dayCount && listings.price) {
        setTotalPrice(dayCount * listings.price);
      } else setTotalPrice(listings.price);
    }
  }, [dateRange, listings?.price]);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    setIsLoading(true);

    axios
      .post("/api/reservations", {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listings.id,
      })
      .then(() => {
        toast.success("Listing reserved");
        setDateRange(initialDateRange);
        router.push('/trips');
      })
      .catch(() => toast.error("Something Went Wrong"))
      .finally(() => {
        setIsLoading(false);
      });
  }, [
    currentUser,
    totalPrice,
    dateRange,
    listings.id,
    loginModal,
    router,
  ]);

  const category = useMemo(() => {
    return categories.find((item) => item.label === listings.category);
  }, [listings?.category]);

  return (
    <div className="max-w-screen-lg mx-auto">
      <ListingHead
        title={listings.title}
        imageSrc={listings.imageSrc}
        locationValue={listings.locationValue}
        id={listings.id}
        currentUser={currentUser}
      />
      <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
        <ListingInfo
          user={listings.user}
          category={category}
          description={listings.description}
          roomCount={listings.roomCount}
          guestCount={listings.guestCount}
          bathroomCount={listings.bathroomCount}
          locationValue={listings.locationValue}
        />
        <div className="order-first mb-10 md:order-last md:col-span-3">
          <ListingReservation 
          price={listings.price}
          totalPrice={totalPrice}
          onChangeDate ={(value) => setDateRange(value)}
          dateRange={dateRange}
          onSubmit={onCreateReservation}
          disabledDates={disableDates
          }
          />
        </div>
      </div>
    </div>
  );
};

export default ListingClient;
