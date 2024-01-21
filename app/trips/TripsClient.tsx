'use client'
import React, { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ReservationType, SafeUser } from '../types'
import Container from '../components/Container'
import Heading from '../components/Heading'
import axios from 'axios'
import toast from 'react-hot-toast'
import ListingsCard from '../components/listing/ListingsCard'

interface TripsClientProps {
    reservation: ReservationType[],
    currentUser?: SafeUser[] | null
}

const TripsClient = ({reservation, currentUser}: TripsClientProps) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');

    const onCancel = useCallback((id: string) => {
        setDeletingId(id);

        axios.delete(`/api/reservations/${id}`)
        .then(() => {
            toast.success("Reservation Cancelled")
            router.refresh();
        })
        .catch((error:any) => {
            toast.error(error?.response?.data?.error);
        })
        .finally(() =>{
            setDeletingId('');
        })


    }, [router]);

  return (
    <Container>
       <Heading title='Trips' subtitle='Where ' />
       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservation.map((reservation) => (
        <ListingsCard />
        ))}
       </div>
        </Container>
  )
}

export default TripsClient