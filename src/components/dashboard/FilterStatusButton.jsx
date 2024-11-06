import { useModalStore } from "../../lib/store/useModalStore"
import { useTableStore } from "../../lib/store/useTableStore"

export default function FilterStatusButton() {
    const { setIsModalOpen, setModalType } = useModalStore() // State management untuk modal
    const { setStatus } = useTableStore() // State management untuk tabel

    return (
        <>
            <div className='flex justify-between items-center mb-4'>
                <div>
                    {/* Button untuk menambah data */}
                    <button onClick={
                        () => {
                            setIsModalOpen(true) // Buka modal
                            setModalType('add') // Set modalType menjadi 'add'
                        }
                    } className='bg-sky-300 px-3 py-3 rounded-md font-medium text-sm border-2 border-sky-300 duration-150 hover:border-sky-400'>Tambah Data</button>
                </div>
                <select
                    onChange={(e) => setStatus(e.target.value)} // Ketika status diubah, jalankan fungsi setStatus dengan parameter value yang diubah
                    className='border border-gray-200 p-2 rounded-md'
                >
                    <option value="all">Semua status</option>
                    <option value="aktif">Aktif</option>
                    <option value="nonaktif">Tidak Aktif</option>
                </select>
            </div>
        </>
    )
}
