import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId: string;
}

export default async function getListingsById(params: IParams) {
  try {
    const { listingId } = params;
    const listing = await prisma.listings.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true,
      },
    });

    if (!listing) return null;

    return listing;
  } catch (error: any) {
    throw new Error(error);
  }
}
