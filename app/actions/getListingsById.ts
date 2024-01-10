import prisma from "@/app/libs/prismadb";

export default async function getListingsById() {
  try {
    const listings = await prisma.listings.findUnique({
      where:{
        
      }
    });
    return listings;
  } catch (error: any) {
    throw new Error(error);
  }
}
