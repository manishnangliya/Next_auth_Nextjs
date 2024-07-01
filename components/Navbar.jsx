'use client'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    const { data: session } = useSession();
    console.log(session?.user);
    return (
        <nav className='bg-black fixed p-4 w-screen'>
            <div className='container mx-auto '>
                <ul className='flex justify-around'>
                    <div className='one flex'>
                        <li className='mx-4 mt-5'>
                            <Link href='/' className="text-white font-bold">
                                Home
                            </Link>
                        </li>
                        <li className='mx-4 mt-5'>
                            <Link href='/dashboard' className="text-white font-bold">
                                Dashboard
                            </Link>
                        </li>
                    </div>


                    <div className='auth flex'>
                        {!session ? (
                            <div className='flex'>
                                <li className='mx-4 mt-5'>
                                    <Link href='/login' className="text-white font-bold">
                                        Login
                                    </Link>
                                </li>
                                <li className='mx-4 mt-5'>
                                    <Link href='/register' className="text-white font-bold">
                                        Register
                                    </Link>
                                </li>
                            </div>
                        ) : (
                        
                            <div className='flex gap-5'>
                                <p className='mx-4 mt-5 text-white font-bold '>Welcome {session?.user.email} </p>
                                <li>
                                    <button className='mx-4 mt-5 text-white font-bold rounded' onClick={() => {
                                        signOut()
                                    }}>
                                        Logout
                                    </button>
                                </li>
                            </div>
                        )}


                    </div>

                </ul>

            </div>

        </nav>
    )
}

export default Navbar
