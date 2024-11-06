import React from 'react'
import { useTableStore } from '../../lib/store/useTableStore'
import { useModalStore } from '../../lib/store/useModalStore'
import FilterStatusButton from './FilterStatusButton'

export default function TableData({
    handleHapus // Fungsi handleHapus yang dikirimkan dari MainComponent
}) {
    const { users, pagination, setPagination, isAscending, setIsAscending, isLoading, filter, setFilter } = useTableStore() // State management untuk tabel
    const { setIsModalOpen, setModalType, setUserSelected } = useModalStore() // State management untuk modal

    // Fungsi handleFilter berfungsi untuk menghandle filter data berdasarkan column / parameter column
    const handleFilter = (column) => { // Fungsi handleFilter yang menerima parameter column
        if (filter === column) { // Jika filter yang dipilih sama dengan column
            setIsAscending(!isAscending) // Ubah status isAscending
        } else { // Jika filter yang dipilih tidak sama dengan column
            setIsAscending(true) // Set isAscending menjadi true
        }
        setFilter(column) // Set filter menjadi column
    }

    // Fungsi handlePagination berfungsi untuk menghandle pagination / parameter page
    const handlePagination = (page) => { // Fungsi handlePagination yang menerima parameter page
        // Set pagination currentPage menjadi page
        setPagination({
            ...pagination,
            currentPage: page
        })
    }

    return (
        <>
            <FilterStatusButton /> {/* FilterStatusButton adalah komponen untuk menghandle filter status aktif/nonaktif */}
            <div className='overflow-auto'>
                <table className="w-full bg-white border border-gray-200">
                    <thead>
                        <tr>
                            <th
                                className="p-3 border-b text-left cursor-pointer"
                            >
                                No.
                            </th>
                            <th
                                className="p-3 border-b text-left cursor-pointer"
                                onClick={() => handleFilter('name')} // Ketika di klik akan menjalankan fungsi handleFilter dengan parameter 'name'
                            >
                                Nama {filter === 'name' && (isAscending ? '↑' : '↓')} {/* Jika filter yang dipilih adalah name, maka tampilkan panah ↑ atau ↓ */}
                            </th>
                            <th
                                className="p-3 border-b text-left cursor-pointer"
                                onClick={() => handleFilter('email')} // Ketika di klik akan menjalankan fungsi handleFilter dengan parameter 'email'

                            >
                                Email {filter === 'email' && (isAscending ? '↑' : '↓')} {/* Jika filter yang dipilih adalah email, maka tampilkan panah ↑ atau ↓ */}
                            </th>
                            <th
                                className="p-3 border-b text-left cursor-pointer"
                                onClick={() => handleFilter('age')} // Ketika di klik akan menjalankan fungsi handleFilter dengan parameter 'age'
                            >
                                Umur {filter === 'age' && (isAscending ? '↑' : '↓')} {/* Jika filter yang dipilih adalah age, maka tampilkan panah ↑ atau ↓ */}
                            </th>
                            <th
                                className="p-3 border-b text-left cursor-pointer"
                                onClick={() => handleFilter('isActive')} // Ketika di klik akan menjalankan fungsi handleFilter dengan parameter 'isActive'
                            >
                                Status {filter === 'isActive' && (isAscending ? '↑' : '↓')} {/* Jika filter yang dipilih adalah isActive, maka tampilkan panah ↑ atau ↓ */}
                            </th>
                            <th
                                className="p-3 border-b text-left cursor-pointer"
                            >
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Jika isLoading true, maka tampilkan loading */}
                        {isLoading ? (
                            <tr>
                                <td colSpan="4" className="p-3 text-center">Loading...</td>
                            </tr>
                        ) : ( // Jika isLoading false, maka tampilkan data users
                            // Slice data users berdasarkan pagination
                            users.slice((pagination.currentPage - 1) * pagination.dataPerPage, pagination.currentPage * pagination.dataPerPage).map((user, index) => (
                                <tr key={index}>
                                    <td className="p-3 border-b">
                                        {index + 1 + (pagination.currentPage - 1) * pagination.dataPerPage} {/* Nomor urut */}
                                    </td>
                                    <td className="p-3 border-b">{user.name}</td> {/* Nama user */}
                                    <td className="p-3 border-b">{user.email}</td> {/* Email user */}
                                    <td className="p-3 border-b">{user.age}</td> {/* Umur user */}
                                    <td className="p-3 border-b">{user.isActive ? 'Aktif' : 'Tidak Aktif'}</td> {/* Status user, jika true maka tampil Aktif */}
                                    <td className='p-3 border-b space-x-2 flex'>
                                        {/* Button edit */}
                                        <button
                                            onClick={() => { // Ketika button edit di klik
                                                setIsModalOpen(true) // Set isModalOpen true
                                                setModalType('edit') // Set modalType menjadi edit
                                                setUserSelected(user) // Set userSelected menjadi user yang di klik
                                            }}
                                            className='bg-orange-300 px-3 py-2 rounded-md font-medium text-xs border-2 border-orange-300 duration-150 hover:border-orange-400'>Edit</button>
                                        {/* Button hapus */}
                                        <button
                                            onClick={() => handleHapus(user.id)} // Ketika button hapus di klik, jalankan fungsi handleHapus dengan parameter user.id
                                            className='bg-red-300 px-3 py-2 rounded-md font-medium text-xs border-2 duration-150 border-red-300 hover:border-red-400'>Hapus</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <p className='text-sm mt-2'>
                Menampilkan {users.length} data
            </p>
            <div className='mx-auto w-fit mt-4 flex gap-2'>
                {/* Pagination */}
                {
                    // Jika currentPage lebih besar dari 1, maka tampilkan button Sebelumnya
                    pagination.currentPage > 1 ? (
                        <div
                            onClick={() => handlePagination(pagination.currentPage - 1)} // Ketika button di klik, jalankan fungsi handlePagination dengan parameter currentPage - 1 / Sebelumnya
                            className='hover:bg-gray-800 hover:text-white px-3 py-2 rounded-md text-sm border-2 cursor-pointer duration-150'>Sebelumnya</div>
                    ) : (
                        // Jika currentPage tidak lebih besar dari 1, maka tampilkan button Sebelumnya dengan cursor not-allowed
                        <div
                            className='bg-gray-200 px-3 py-2 rounded-md text-sm border-2 duration-150 cursor-not-allowed'>Sebelumnya</div>
                    )
                }
                {
                    // Jika currentPage kurang dari total data / jumlah data per page, maka tampilkan button Selanjutnya
                    pagination.currentPage < Math.ceil(users.length / pagination.dataPerPage) ? ( // Math.ceil digunakan untuk membulatkan ke atas
                        <div
                            onClick={() => handlePagination(pagination.currentPage + 1)} // Ketika button di klik, jalankan fungsi handlePagination dengan parameter currentPage + 1 / Selanjutnya
                            className='hover:bg-gray-800 hover:text-white px-3 py-2 rounded-md text-sm border-2 cursor-pointer duration-150'>Selanjutnya</div>
                    ) : (
                        // Jika currentPage tidak kurang dari total data / jumlah data per page, maka tampilkan button Selanjutnya dengan cursor not-allowed
                        <div
                            className='bg-gray-200 px-3 py-2 rounded-md text-sm border-2 duration-150 cursor-not-allowed'>Selanjutnya</div>
                    )
                }
            </div>
        </>

    )
}
