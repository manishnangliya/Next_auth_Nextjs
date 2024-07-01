import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation';
import React from 'react'

const Dashboard = async () => {
    const session = await getServerSession();
    if (!session) {
        redirect('/');
    }
    return (
        <div className='flex min-h-screen flex-col items-center p-24'>
            <h1 className='text-green-600 font-bold border p-4'>
                User Successfully Logged In
            </h1>

        </div>
    )
}

export default Dashboard
