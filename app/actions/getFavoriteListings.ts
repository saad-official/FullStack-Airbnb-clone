import React from "react";
import getCurrentUser from "./getCurrentUser";
import Prisma from "@/app/libs/prismadb";
const getFavoriteListings = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) return [];

  const favoriteListings = await Prisma.listings.findMany({
    where: {
      id: {
        in: [...(currentUser.favoriteIds || [])],
      },
    },
  });

  return favoriteListings;
};

export default getFavoriteListings;
