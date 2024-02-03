import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import getReservation from "../actions/getReservation";
import FavoritesClient from "./FavoritesClient";
import getFavoriteListings from "../actions/getFavoriteListings";

const FavoritesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="UnAuthorize" subtitle="Please Login" />
      </ClientOnly>
    );
  }
  const listings = await getFavoriteListings();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No Favorites Found"
          subtitle="Looks like you have no Favorites Listing"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <FavoritesClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
};
export default FavoritesPage;
