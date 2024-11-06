import { create } from "zustand";

// Membuat store untuk modal dengan menggunakan zustand
export const useModalStore = create((set) => ({ // Membuat store dengan nama useModalStore
    isModalOpen: false, // State untuk mengecek apakah modal terbuka atau tidak
    setIsModalOpen: (isOpen) => set({ isModalOpen: isOpen }), // Fungsi untuk mengubah state isModalOpen
    modalType: null, // State untuk mengecek tipe modal yang sedang terbuka (edit / add)
    setModalType: (type) => set({ modalType: type }), // Fungsi untuk mengubah state modalType
    userSelected: null, // State untuk menyimpan data user yang dipilih untuk diedit
    setUserSelected: (user) => set({ userSelected: user }), // Fungsi untuk mengubah state userSelected (data user yang dipilih)
}));