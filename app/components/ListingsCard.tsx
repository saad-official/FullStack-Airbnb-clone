'use client'
import { Listings, Reservation } from '@prisma/client'
import { SafeUser } from "@/app/types";
import React, { useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation';
import useCountries from '../hooks/useCountries';
import { format } from 'date-fns';
import Image from 'next/image';
import HeartButton from './HeartButton';
interface ListingCardProps {
  data: Listings,
  reservation?: Reservation,
  onAction?: (id: string) => void,
  disabled?: boolean,
  actionLabel?: string,
  actionId?: string,
  currentUser?: SafeUser | null,

}

const ListingsCard = ({data, reservation, onAction, disabled, actionLabel, actionId = "", currentUser} : ListingCardProps) => {
  const router = useRouter();
  const { getByValue } = useCountries();
  const location = getByValue(data?.locationValue);

  const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    
    e.stopPropagation();

    if (disabled) {
      return;
    }

    onAction?.(actionId);
  }, [onAction, actionId, disabled]);

  const price = useMemo(() => {

    if (reservation) {
      return reservation.totalPrice;
    }

    return data?.price;
  }, [data?.price, reservation]);


  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }
      const start = new Date(reservation?.startDate);
    const end = new Date(reservation?.endDate);

    return `${format(start, 'PP')} - ${format(end, 'PP')}`

  }, [reservation]);


  return (
    <div onClick={() => router.push(`/listings/${data?.id}`)}
    className='col-span-1 cursor-pointer group'
    >

      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            alt='Listing'
            src={data?.imageSrc}
            width={100}
            height={100}
            objectFit='cover'
          className='object-cover h-full w-full group-hover:scale-110 transition'
          />
          <div className="absolute top-3 right-3">
            <HeartButton
              currentUser={currentUser}
              listingId={data?.id}
              key={data?.id}
            />
          </div>
      </div>
      </div>

    </div>
  )
}

export default ListingsCard