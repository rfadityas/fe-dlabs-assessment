import { IoClose } from "react-icons/io5";

export default function Modal({
    isOpen, // Props untuk menentukan apakah modal terbuka atau tidak
    setIsOpen, // Props untuk mengubah state isOpen
    children // Props untuk menampilkan konten
}) {

    if (!isOpen) return null

    return (
        <div onClick={() => setIsOpen(false)} className='fixed left-0 top-0 min-h-screen bg-black/50 w-full'> {/* Ketika user klik diluar modal, maka modal akan tertutup */}
            <div onClick={(e) => e.stopPropagation()} className='w-1/2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-md'> {/* Ketika user klik didalam modal, maka modal tidak akan tertutup */}
                <div className='flex justify-between items-center'>
                    <h1 className='text-xl font-bold'>DataTech</h1>
                    <button className='border-2 border-black rounded-md p-1 hover:bg-black hover:text-white duration-200' onClick={() => setIsOpen(false)}><IoClose /></button> {/* Button untuk menutup modal */}
                </div>
                <div className='my-4'>
                    {children} {/* Menampilkan konten modal */}
                </div>
            </div>
        </div>
    )
}
