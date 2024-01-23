import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import getReservation from "../actions/getReservation";
import ReservationsClient from "./ReservationsClient";


const FavoritesPage = async () => {
const currentUser = await getCurrentUser();


if(!currentUser){

    return (
    <ClientOnly>
        <EmptyState
        title="UnAuthorize"
        subtitle="Please Login"
        />
    </ClientOnly>
    )
}
const reservation = await getReservation({authorId:currentUser.id});

if(reservation.length === 0){
    return (
        <ClientOnly>
            <EmptyState title="No Favorites Found"
            subtitle="Looks like you have no Favorites Listing"
            />
        </ClientOnly>
    )
}



return (
    <ClientOnly>
        <ReservationsClient reservations={reservation} currentUser={currentUser} />
    </ClientOnly>
)


} 
export default FavoritesPage