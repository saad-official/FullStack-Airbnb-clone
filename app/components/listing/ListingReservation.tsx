import React from "react";
import { Range } from "react-date-range";
import Calendar from "../inputs/Calendar";
interface ListingReservationProps {
  price: number;
  totalPrice: number;
  dateRange: Range;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabledDates: Date[];
}

const ListingReservation = ({
  price,
  totalPrice,
  dateRange,
  onChangeDate,
  onSubmit,
  disabledDates,
}: ListingReservationProps) => {
  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden ">
      <div className="flex flex-row items-center gap1 p-4 ">
        <div className="text-2xl font-semibold">$ {price}</div>

        <div className="font-light text-neutral-600">night</div>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selections)}
      />
      <hr />
      <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg ">
         
         <div>
            Total
         </div>
         
         <div>
         Price  {totalPrice}
         </div>
      </div>
    </div>
  );
};

export default ListingReservation;
