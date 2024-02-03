"use client"

import axios from 'axios';
import { signIn } from 'next-auth/react';
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function page() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [creatingUser, setCreatingUser] = useState(false);
    const [userCreated, setUserCreated] = useState(false);
    const [error, setError] = useState({});

    async function handleFormSubmit(ev) {
        ev.preventDefault();
        setCreatingUser(true);
        setError(false);
        try {
            const { data } = await axios.post('/api/register', {
                email, password
            });
            if (!data.success) {
                setError({
                    validationError: data?.error?.email?.message || data?.error?.password?.message
                });
            }
            if (data.success) {
                setUserCreated(true);
            } else {
                setError({
                    validationError: "user already exists"
                });
            }
        } catch (error) {
            console.log(error)
            setError({
                message: error.message
            });
        }
        setCreatingUser(false);
    }


    return (
        <section className='mt-8'>
            <h1 className="text-center text-primary text-4xl mb-4">
                Register
            </h1>
            {userCreated && (
                <div className="my-4 text-center">
                    User created.<br />
                    Now you can{' '}
                    <Link className="underline" href={'/login'}>Login &raquo;</Link>
                </div>
            )}
            {error.message ? (
                <div className="my-4 text-center">
                    An error has occurred.<br />
                    Please try again later
                </div>
            ) : error.validationError ? (
                <div className="my-4 text-primary text-center">
                    {error.validationError}
                </div>
            ) : null}
            <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
                <input type="email" placeholder="email" value={email}
                    disabled={creatingUser || userCreated}
                    onChange={ev => setEmail(ev.target.value)} />
                <input type="password" placeholder="password" value={password}
                    disabled={creatingUser || userCreated}
                    onChange={ev => setPassword(ev.target.value)} />
                <button type="submit" disabled={creatingUser || userCreated}>
                    Register
                </button>
                <div className="my-4 text-center text-gray-500">
                    or login with provider
                </div>
                <button type="button" onClick={() => signIn('google', { callbackUrl: '/' })}
                    className="flex gap-4 justify-center">
                    <Image src={'/google.png'} alt={''} width={24} height={24} />
                    Login with google
                </button>
                <div className="text-center my-4 text-gray-500 border-t pt-4">
                    Existing account?{' '}
                    <Link className="underline" href={'/login'}>Login here &raquo;</Link>
                </div>
            </form>
        </section>
    )
}
