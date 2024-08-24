import { create } from "zustand";

const useStoreRemove = create((set) => ({
    deleteConfirmation: false,
    selectedProduct: "",
    drawerOpen: false,
    
    setDrawerOpen: () => set({ drawerOpen: true }),
    setDrawerClose: () => set({ drawerOpen: false }),

    toggleDeleteConfirmation: (value) => set({ deleteConfirmation: value }),
    setSelectedProduct: (product) => set({ selectedProduct: product }),
  })
);

export default useStoreRemove;
