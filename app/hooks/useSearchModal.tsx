import { create } from "zustand";

interface SeachModalStore {
    isOpen: boolean,
    onOpen: () => void,
    onClose: () => void    
}

const useSearchModal = create<SeachModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}
));

export default useSearchModal;