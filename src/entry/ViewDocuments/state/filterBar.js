import { create } from "zustand";

const useFilterBar = create((set) => ({
  searchValue: "",
  setSearchValue: (searchValue) => set({ searchValue }),

  categoryValue: "",
  setCategoryValue: (categoryValue) => set({ categoryValue }),

  dateValue: "",
  setDateValue: (dateValue) => set({ dateValue }),
}));

export default useFilterBar;