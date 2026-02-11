import { create } from "zustand";

interface SearchState {
    query: string;
    type: string;
    minPrice: number;
    maxPrice: number;
    wilaya: string;
    setQuery: (query: string) => void;
    setType: (type: string) => void;
    setMinPrice: (price: number) => void;
    setMaxPrice: (price: number) => void;
    setWilaya: (wilaya: string) => void;
    resetFilters: () => void;
}

export const useSearch = create<SearchState>()((set) => ({
    query: "",
    type: "",
    minPrice: 0,
    maxPrice: 100000,
    wilaya: "",
    setQuery: (query) => set({ query }),
    setType: (type) => set({ type }),
    setMinPrice: (minPrice) => set({ minPrice }),
    setMaxPrice: (maxPrice) => set({ maxPrice }),
    setWilaya: (wilaya) => set({ wilaya }),
    resetFilters: () =>
        set({
            query: "",
            type: "",
            minPrice: 0,
            maxPrice: 100000,
            wilaya: "",
        }),
}));
