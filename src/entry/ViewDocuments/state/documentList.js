import { create } from "zustand";

const useDocumentList = create((set) => ({
  documents: [],
  setDocuments: (documents) => set({ documents }),
}));

export default useDocumentList;