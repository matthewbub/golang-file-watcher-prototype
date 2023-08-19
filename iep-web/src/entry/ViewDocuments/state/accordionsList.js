import { create } from "zustand";

const useAccordionsList = create((set) => ({
  accordions: [],
  setAccordions: (accordions) => set({ accordions }),
  openAccordion: (id) => set((state) => ({ accordions: { ...state.accordions, [id]: true } })),
  closeAccordion: (id) => set((state) => ({ accordions: { ...state.accordions, [id]: false } })),
}));

export default useAccordionsList;