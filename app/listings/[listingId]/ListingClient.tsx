import { SafeListing, SafeUser } from '@/app/types'
import { Reservation } from '@prisma/client'
import React from 'react'

interface ListingClientProps {
    reservations?:Reservation[],
    listing:SafeListing & {
        user:SafeUser
    },
    currentUser:SafeUser | null
}

const ListingClient = () => {
  return (
    <div>ListingClient</div>
  )
}

export default ListingClient