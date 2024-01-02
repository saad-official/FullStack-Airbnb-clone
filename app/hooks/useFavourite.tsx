import React, { useCallback, useMemo } from "react";
import { SafeUser } from "../types";
import { useRouter } from "next/navigation";
import useLoginModal from "./useLoginModal";
import axios from "axios";
import toast from "react-hot-toast";

interface IUseFavourite {
  listingId: string;
  currentUser: SafeUser | null;
}

const useFavourite = ({ currentUser, listingId }: IUseFavourite) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const HasFavourite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  }, [listingId, currentUser]);

  const toggleFavourite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        let request;
        if (HasFavourite) {
          request = () => axios.delete(`/api/favourites/${listingId}`);
        } else {
          request = () => axios.post(`/api/favourites/${listingId}`);
        }

        await request();
        router.refresh();
        toast.success("Success");
      } catch (error) {
        toast.error("Something Went Wrong");
      }
    },
    [HasFavourite, currentUser, listingId, loginModal, router]
  );

  return {
    HasFavourite,
    toggleFavourite,
  };
};
export default useFavourite;
