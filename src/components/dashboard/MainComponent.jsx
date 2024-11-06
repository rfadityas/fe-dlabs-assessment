import React, { useEffect, useState } from 'react'
import { useUsers } from '../../hooks/users'
import Modal from '../Modal'
import { AddUserModal, EditUserModal } from './modal'
import TableData from './TableData'
import { useModalStore } from '../../lib/store/useModalStore'
import { useTableStore } from '../../lib/store/useTableStore'

export default function MainComponent() {
    const { getUsers, postUser, editUser, deleteUser } = useUsers() // Custom hook yang berkaitan dengan data user & CRUD

    const { users, setUsers, pagination, setPagination, filter, isAscending, status, setIsLoading } = useTableStore() // State management untuk tabel

    const { isModalOpen, setIsModalOpen, modalType, userSelected } = useModalStore() // State management untuk modal

    // Logic modal dimulai
    // Dibawah ini adalah logic untuk menghandle penambahan user yang berisikan parameter data
    const handleAddUser = (data) => {
        const newUsers = postUser(data) // Parameter data yang dikirimkan ke postUser / hooks postUser
        setUsers(newUsers) // Data yang direturn pada postUser akan di set ke state users
        setIsModalOpen(false) // Tutup modal
        alert('Data berhasil ditambahkan') // Tampilkan alert
    }

    // Dibawah ini adalah logic untuk menghandle edit user yang berisikan parameter data
    const handleEditUser = (data) => {
        const updatedUsers = editUser(data) // Parameter data yang dikirimkan ke editUser / hooks editUser
        setUsers(updatedUsers) // Data yang direturn pada editUser akan di set ke state users
        setIsModalOpen(false) // Tutup modal
        alert('Data berhasil diubah') // Tampilkan alert
    }

    // Dibawah ini adalah logic untuk menghapus user berdasarkan id
    const handleHapus = (id) => {
        const confirm = window.confirm('Apakah anda yakin ingin menghapus data ini?') // Tampilkan konfirmasi apakah user yakin ingin menghapus data

        if (confirm) { // Jika user yakin ingin menghapus data
            const updatedUsers = deleteUser(id) // Parameter id yang dikirimkan ke deleteUser / hooks deleteUser
            setUsers(updatedUsers) // Data yang direturn pada deleteUser akan di set ke state users
            alert('Data berhasil dihapus') // Tampilkan alert

            // Mereset pagination ke halaman pertama
            setPagination({
                ...pagination,
                currentPage: 1
            })
        }
    }
    // Logic modal berakhir

    // UseEffect dibawah berfungsi untuk menghandle pemfilteran status aktif/nonaktif
    useEffect(() => {
        const usersLocalStorage = localStorage.getItem('usersData') // Ambil data users dari local storage
        const users = JSON.parse(usersLocalStorage) // Parse data users dari local storage

        if (usersLocalStorage) { // Jika data users ada
            if (status === 'aktif') { // Jika status yang dipilih adalah aktif
                setUsers(users.filter(user => user.isActive === true)) // Filter data users yang isActive nya true
            } else if (status === 'nonaktif') { // Jika status yang dipilih adalah nonaktif
                setUsers(users.filter(user => user.isActive === false)) // Filter data users yang isActive nya false
            } else if (status === 'all') { // Jika status yang dipilih adalah all
                setUsers(users) // Tampilkan semua data users
            }

            // Mereset pagination ke halaman pertama
            setPagination({
                ...pagination,
                currentPage: 1
            })
        }
    }, [status]) // Dependency status yang berarti useEffect akan dijalankan jika status berubah


    // UseEffect dibawah berfungsi untuk menghandle sorting data, berdasarkan kolom yang dipilih
    useEffect(() => {
        let sortedData = [...users]; // Copy data dari state users ke sortedData / array baru
        if (filter) { // Jika nilai state filter ada
            sortedData.sort((a, b) => { // Lakukan sorting data
                if (a[filter] < b[filter]) return isAscending ? -1 : 1; // Jika a lebih kecil dari b, return -1 jika isAscending true, jika tidak return 1
                if (a[filter] > b[filter]) return isAscending ? 1 : -1; // Jika a lebih besar dari b, return 1 jika isAscending true, jika tidak return -1
                return 0; // Jika tidak ada kondisi diatas, return 0
            });
        }

        // Data yang sudah di sorting akan di set ke state users
        setUsers(sortedData);
    }, [filter, isAscending]); // Dependency filter & isAscending yang berarti useEffect akan dijalankan jika filter atau isAscending berubah

    //  UseEffect dibawah berfungsi untuk fetch yang pertama kali saat aplikasi dijalankan dan menyimpan data ke local storage
    useEffect(() => {
        const usersLocalStorage = localStorage.getItem('usersData') // Ambil data users dari local storage
        if (!usersLocalStorage) { // Jika data users tidak ada
            // Logic untuk fetch data users
            const fetchUsers = async () => {
                try { // Try catch untuk menangkap error
                    setIsLoading(true) // Set isLoading true
                    const users = await getUsers() // Ambil data users dari API
                    setUsers(users) // Set data users ke state users
                } catch (error) { // Jika terjadi error
                    console.log(error) // Tampilkan error di console
                } finally { // Finally akan dijalankan setelah try dan catch selesai
                    setIsLoading(false) // Set isLoading false
                }
            }

            fetchUsers() // Panggil fungsi fetchUsers diatas
        } else { // Jika data users ada
            setUsers(JSON.parse(usersLocalStorage)) // Set data users dari local storage ke state users
        }
    }, [])

    return (
        <div className='p-8'>
            {/* Komponen Modal */}
            <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
                {modalType === 'add' && <AddUserModal handleAddUser={handleAddUser} />} {/* Jika modalType adalah add, tampilkan Komponen AddUserModal */}
                {modalType === 'edit' && <EditUserModal user={userSelected} handleEditUser={handleEditUser} />} {/* Jika modalType adalah edit, tampilkan Komponen EditUserModal */}
            </Modal>

            {/* Komponen TableData */}
            <TableData
                handleHapus={handleHapus} // Props handleHapus yang berisi fungsi handleHapus data
            />
        </div>
    )
}
