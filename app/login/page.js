'use client'
import { useSession,signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { toast } from 'react-toastify';

const Login = () => {
    const router = useRouter();
    const { data: session, status: sessionStatus } = useSession();

    useEffect(() => {
        if (sessionStatus === 'authenticated') {
            router.push('/dashboard');
        }
    }, [sessionStatus, router])
    const handleLogin = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
        if (!email || !password) {
            toast.error("Please fill all the input fields");
            return;
        }

        try {
            // const res = await fetch('/api/login', {
            //     method: "POST",
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({
            //         email,
            //         password,
            //     })
            // })
            // if (res.ok) {
            //     toast.success("User Successfully Logged In");
            //     router.push('/dashboard');
            // }
            // else {
            //     toast.error("Please Enter Correct Password")
            // }
            const res = await signIn('credentials',{
                redirect:false,
                email,password
            });
            if(res?.error){
                if(res?.url){
                    router.replace('/dashboard');
                }
                toast.error("Invalid Credentials")
            }else{
                toast.success("Successfully Logged In");
            }

        } catch (error) {
            toast.error(error);
        }

    }

    if (sessionStatus === 'loading') {
        return <h1>Loading...</h1>
    }

    return sessionStatus !== 'authenticated' && (
        <div className='min-h-screen bg-gray-100 flex items-center justify-center'>
            <div className='bg-white p-8 rounded shadow-md w-96'>
                <h2 className='text-2xl font-semibold mb-4 flex justify-center items-center'>
                    Login
                </h2>
                <form onSubmit={handleLogin}>
                    <div className='mb-4'>
                        <div className='mb-4'>
                            <label htmlFor='email' className='black text-gray-700 text-sm font-bold mb-2'> Email</label>
                            <input type='email' id='email' name='email' className='w-full p-2 border border-gray-300 rounded' />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor='password' className='black text-gray-700 text-sm font-bold mb-2'> Password</label>
                            <input type='password' id='password' name='password' className='w-full p-2 border border-gray-300 rounded' />
                        </div>
                        <div>
                            <button type='submit' className='mb-5 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600'>Login Now</button>
                        </div>
                        <span>
                            {" "}
                            Do not have an account? {" "}
                            <Link className='text-center text-blue-500 hover:underline mt-2' href='/register'>
                                Register
                            </Link>
                        </span>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Login
