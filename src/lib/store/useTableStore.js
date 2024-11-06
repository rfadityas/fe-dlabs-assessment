import { create } from "zustand";

// Membuat store untuk tabel dengan menggunakan zustand
export const useTableStore = create((set) => ({ // Membuat store dengan nama useTableStore
    users: [], // State untuk menyimpan data user berupa array
    setUsers: (users) => set({ users }), // Fungsi untuk mengubah state users
    pagination: { // State untuk menyimpan data pagination
        currentPage: 1, // Halaman saat ini
        dataPerPage: 10, // Jumlah data per halaman
    },
    isLoading: false, // State untuk mengecek apakah data sedang di load atau tidak
    setIsLoading: (isLoading) => set({ isLoading }), // Fungsi untuk mengubah state isLoading
    setPagination: (pagination) => set({ pagination }), // Fungsi untuk mengubah state pagination
    filter: null, // State untuk menyimpan data filter kolom tabel
    setFilter: (filter) => set({ filter }), // Fungsi untuk mengubah state filter kolom tabel
    isAscending: true, // State untuk mengecek apakah data diurutkan secara ascending atau descending
    setIsAscending: (isAscending) => set({ isAscending }), // Fungsi untuk mengubah state isAscending
    status: 'all', // State untuk menyimpan filtering status user yang sedang ditampilkan (all / active / inactive)
    setStatus: (status) => set({ status }), // Fungsi untuk mengubah state status
}));