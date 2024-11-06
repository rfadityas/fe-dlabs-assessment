import React from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { userSchema } from '../../../lib/validations/userSchema';

export const AddUserModal = ({ handleAddUser }) => { // Fungsi AddUserModal yang menerima parameter handleAddUser

    const { register, handleSubmit, formState: { errors } } = useForm({ // Destructuring register, handleSubmit, errors dari useForm
        resolver: yupResolver(userSchema), // Resolver dari userSchema
        // Default values untuk form
        defaultValues: {
            name: '',
            email: '',
            age: '',
            isActive: true
        }
    });

    const onSubmit = (data) => { // Fungsi onSubmit yang menerima parameter data
        handleAddUser(data) // Jalankan fungsi handleAddUser dengan parameter data
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}> {/* Ketika form di submit, jalankan fungsi onSubmit */}
            <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama</label>
                <input type="text" id="name" {...register("name")} className="mt-1 p-2 block w-full border border-gray-300 rounded-md" /> {/* Register input name */}
                {errors.name && <p className="text-red-500 text-xs mt-1">Nama tidak boleh kosong</p>} {/* Jika errors name ada, tampilkan pesan */}
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" id="email" {...register("email")} className="mt-1 p-2 block w-full border border-gray-300 rounded-md" /> {/* Register input email */}
                {errors.email && <p className="text-red-500 text-xs mt-1">Email tidak valid</p>} {/* Jika errors email ada, tampilkan pesan */}
            </div>
            <div className="mb-4">
                <label htmlFor="age" className="block text-sm font-medium text-gray-700">Umur</label>
                <input type="number" id="age" {...register("age")} className="mt-1 p-2 block w-full border border-gray-300 rounded-md" /> {/* Register input age */}
                {errors.age && <p className="text-red-500 text-xs mt-1">Umur tidak boleh kosong</p>} {/* Jika errors age ada, tampilkan pesan */}
            </div>
            <div className='mb-4'>
                <label htmlFor="isActive" className="block text-sm font-medium text-gray-700">Status</label>
                <select id="isActive" {...register("isActive")} className="mt-1 p-2 block w-full border border-gray-300 rounded-md"> {/* Register select isActive */}
                    <option value="true">Aktif</option>
                    <option value="false">Tidak Aktif</option>
                </select>
            </div>
            <div className='flex justify-end'>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">Simpan Data</button>
            </div>

        </form>
    )
}
