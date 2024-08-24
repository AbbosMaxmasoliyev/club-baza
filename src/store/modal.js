import { create } from "zustand";

const useStoreModal= create((set) => ({
    deleteConfirmation: false,
    selecteModal: "",
    drawerOpen: false,
    clientToken: null,
    setDrawerOpen: () => set({ drawerOpen: true }),
    setDrawerClose: () => set({ drawerOpen: false }),
    setClientToken: (value) => set({ clientToken: value }),

    toggleModalConfirmation: (value) => set({ deleteConfirmation: value }),
    setSelecteModal: (product) => set({ selecteModal: product }),
  })
);

export default useStoreModal;
