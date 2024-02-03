import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import getReservation from "../actions/getReservation";
import ReservationsClient from "./ReservationsClient";

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="UnAuthorize" subtitle="Please Login" />
      </ClientOnly>
    );
  }
  const reservation = await getReservation({ authorId: currentUser.id });

  if (reservation.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No Reservations Found"
          subtitle="Looks like you have no Reservation on Your Property"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ReservationsClient
        reservations={reservation}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};
export default ReservationsPage;
