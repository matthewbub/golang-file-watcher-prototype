import { create } from "zustand";

const useCategoryList = create((set) => ({
  categories: [],
  setCategories: (categories) => set({ categories }),
}));

export default useCategoryList;