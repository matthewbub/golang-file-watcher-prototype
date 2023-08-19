import { create } from 'zustand'

export const useSessionStore = create((set) => ({
  session: null,
  setSession: (incoming) => set((state) => ({
    ...state,
    session: incoming
  }))
}));
