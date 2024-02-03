"use client";
import useCountries from "@/app/hooks/useCountries";
import useSearchModal from "@/app/hooks/useSearchModal";
import { differenceInDays } from "date-fns";
import { useSearchParams } from "next/navigation";
import React, { useMemo } from "react";
import { BiSearch } from "react-icons/bi";
const Search = () => {
  const searchModal = useSearchModal();
  const { getByValue } = useCountries();

  const params = useSearchParams();

  const locationValue = params?.get("locationValue");
  const startDate = params?.get("startDate");
  const endDate = params?.get("endDate");
  const guestCount = params?.get("guestCount");

  const locationLabel = useMemo(() => {
    if (locationValue) return getByValue(locationValue as string)?.label;

    return "AnyWhere";
  }, [getByValue, locationValue]);

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      let diff = differenceInDays(end, start);

      if (diff == 0) diff = 1;

      return `${diff} days`;
    }
    return "Any Week";
  }, [endDate, startDate]);

  const guestLabel = useMemo(() => {
    if (guestCount) return `${guestCount} guests`;

    return "Add Guests";
  }, [guestCount]);

  return (
    <div
      onClick={searchModal.onOpen}
      className="w-full border-[1px] md:w-auto py-2 shadow-sm rounded-full  hover:shadow-md  transition cursor-pointer "
    >
      <div className="flex flex-row items-center justify-between">
        <div className="text-sm font-semibold px-6">{locationLabel}</div>
        <div
          className="hidden 
            sm:block 
            text-sm 
            font-semibold 
            px-6 
            border-x-[1px] 
            flex-1 
            text-center"
        >
          {durationLabel}
        </div>

        <div className="pl-6 text-sm pr-2 text-gray-600 flex flex-row items-center gap-3">
          <div className="hidden sm:block ">{guestLabel}</div>
          <div className="p-2 bg-rose-500 rounded-full text-white">
            <BiSearch />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
