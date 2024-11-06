import { apiRequest } from "../config/request";

// Membuat custom hook useUsers
export const useUsers = () => {

    const getUsers = async () => { // Fungsi getUsers untuk mengambil data user dari API GitHub
        const { data } = await apiRequest.get("users"); // Memanggil API GitHub untuk mengambil data user
        const userData = data.map((user) => { // Mengubah data user dari API GitHub menjadi data user yang diinginkan
            // Mengembalikan data user yang diinginkan
            return {
                id: user.id,
                name: user.login,
                email: `${user.login}@gmail.com`,
                age: Math.floor(Math.random() * 50), // Umur user random antara 0 - 50
                isActive: Math.random() > 0.5, // Status user random true / false
            }
        })

        localStorage.setItem('usersData', JSON.stringify(userData)) // Menyimpan data user ke local storage

        return userData; // Mengembalikan data user yang sudah diambil & dimodifikasi
    };

    const postUser = (newUser) => {
        // Mengambil data user yang sudah ada pada local storage
        const usersData = JSON.parse(localStorage.getItem('usersData'));
        // Mengambil id user terakhir
        const lastId = usersData[usersData.length - 1].id;
        // Menambahkan id user baru / id user terakhir + 1
        newUser.id = lastId + 1;
        // Menambahkan user baru ke data user yang sudah ada
        const newUsersData = [...usersData, newUser];

        // Menyimpan data user yang sudah di edit ke local storage
        localStorage.setItem('usersData', JSON.stringify(newUsersData));

        // Mengembalikan data user yang sudah di edit
        return newUsersData;
    }

    const editUser = (editedUser) => {
        // Mengambil data user yang sudah ada pada local storage
        const usersData = JSON.parse(localStorage.getItem('usersData'));
        // Mencari id user yang akan di edit & mengganti data user tersebut jika id nya sama
        const updatedUsers = usersData.map(user => {
            if (user.id === editedUser.id) {
                // Mengganti data user yang di edit
                return editedUser
            }
            return user
        })

        // Menyimpan data user yang sudah di edit ke local storage
        localStorage.setItem('usersData', JSON.stringify(updatedUsers));

        // Mengembalikan data user yang sudah di edit
        return updatedUsers;
    }

    const deleteUser = (id) => {
        // Mengambil data user yang sudah ada pada local storage
        const usersData = JSON.parse(localStorage.getItem('usersData'));
        // Menghapus user yang memiliki id yang sama dengan id yang dihapus
        const updatedUsers = usersData.filter(user => user.id !== id);

        // Menyimpan data user yang sudah di edit ke local storage
        localStorage.setItem('usersData', JSON.stringify(updatedUsers));

        // Mengembalikan data user yang sudah di edit
        return updatedUsers;
    }

    return { getUsers, postUser, editUser, deleteUser }; // Mengembalikan fungsi getUsers
};