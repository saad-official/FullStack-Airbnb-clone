import getCurrentUser from "./actions/getCurrentUser";
import getListings, { IListingParams } from "./actions/getListings";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingsCard from "./components/listing/ListingsCard";

interface HomePageProps {
  searchParams:IListingParams
}

const Home = async  ({searchParams} :HomePageProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser()

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 ">
          {listings.map((listing: any) => {
            return <div key={listing.title} className="">
            <ListingsCard currentUser={currentUser} data={listing}  />
          </div>
       })}
        </div>
      </Container>
    </ClientOnly>
  );
}
export default Home;