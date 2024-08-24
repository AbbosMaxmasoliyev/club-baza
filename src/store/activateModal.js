import { create } from "zustand";

const useStoreActivateModal= create((set) => ({
    activate: false,
    selectedActivateModal: "",
    drawerOpen: false,

    setDrawerOpen: () => set({ drawerOpen: true }),
    setDrawerClose: () => set({ drawerOpen: false }),

    toggleActivateModal: (value) => set({ activate: value }),
    setSelectedModal: (product) => set({ selectedActivateModal: product }),
  })
);

export default useStoreActivateModal;
