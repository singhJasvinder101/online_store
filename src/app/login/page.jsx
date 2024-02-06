"use client"

import { signIn } from "next-auth/react";
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

export default function Page() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [creatingUser, setCreatingUser] = useState(false);
    const [userCreated, setUserCreated] = useState(false);
    const [error, setError] = useState({});

    async function handleFormSubmit(ev) {
        ev.preventDefault();

        try {
            // posting the email and password
            await signIn('credentials', { email, password, callbackUrl: '/' });
        } catch (error) {
            console.log('Authentication error:', error);
        }
    }


    return (
        <section className='mt-8'>
            <h1 className="text-center text-primary text-4xl mb-4">
                Login
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
                <input name='email' type="email" placeholder="email" value={email}
                    disabled={creatingUser || userCreated}
                    onChange={ev => setEmail(ev.target.value)} />
                <input name='password' type="password" placeholder="password" value={password}
                    disabled={creatingUser || userCreated}
                    onChange={ev => setPassword(ev.target.value)} />
                <button type="submit" disabled={creatingUser || userCreated}>
                    Login
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
                    Not Have Account?
                    <Link className="underline" href={'/login'}>Register here &raquo;</Link>
                </div>
            </form>
        </section>
    )
}
