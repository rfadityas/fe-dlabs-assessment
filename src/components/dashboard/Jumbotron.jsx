import React from 'react'

export default function Jumbotron() {
    return (
        <div className='w-full bg-gray-700 h-[30vh] flex justify-center text-white items-center flex-col gap-4'>
            <h1 className='font-extrabold text-6xl lg:text-8xl'>DataTech</h1>
            <p className='lg:text-xl text-md bg-white text-gray-700 px-4 py-2 font-semibold'>Dashboard Management</p>
        </div>
    )
}
