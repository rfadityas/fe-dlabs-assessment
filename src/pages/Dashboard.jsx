import React from 'react'
import Jumbotron from '../components/dashboard/Jumbotron'
import MainComponent from '../components/dashboard/MainComponent'

export default function Dashboard() {
    return (
        <div className='space-y-4'>
            {/* Jumbotron adalah komponen bagian atas */}
            <Jumbotron />
            {/* MainComponent adalah komponen utama yang berisi tabel & pengoperasian CRUD */}
            <MainComponent />
        </div>
    )
}
