import { create } from "zustand";

export const useOverlayStore = create((set) => ({
  overlay: false,
  setOverlay: (overlay) => set({ overlay }),
}));
