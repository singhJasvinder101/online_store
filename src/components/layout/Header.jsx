"use client"

import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { CartContext } from '../AppContext';
import { IoCart } from "react-icons/io5";
import { FaBarsStaggered } from "react-icons/fa6";

function AuthLinks({ status, userName }) {
    if (status === 'authenticated') {
        return (
            <>
                <Link href={'/profile'} className="whitespace-nowrap">
                    Hello, {userName}
                </Link>
                <button
                    onClick={() => signOut()}
                    className="bg-primary rounded-full text-white px-8 py-2">
                    Logout
                </button>
            </>
        );
    }
    if (status === 'unauthenticated') {
        return (
            <>
                <Link href={'/login'}>Login</Link>
                <Link href={'/register'} className="bg-primary rounded-full text-white px-8 py-2">
                    Register
                </Link>
            </>
        );
    }
}


export default function Header() {
    const session = useSession()
    const status = session?.status;
    const userData = session.data?.user;
    let userName = userData?.name || userData?.email;
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    if (userName && userName.includes(' ')) {
        userName = userName.split(' ')[0];
    }

    if (!session) {
        signIn();
        return null;
    }

    const { cartProducts } = useContext(CartContext)

    return (
        <header>
            <div className="flex items-center md:hidden justify-between">
                <Link className="text-primary font-semibold text-2xl" href={'/'}>
                    ST PIZZA
                </Link>
                <div className="flex gap-8 items-center">
                    <Link href={'/cart'} className="relative">
                        <IoCart className='text-2xl' />
                        {cartProducts?.length > 0 && (
                            <span className="absolute -top-2 -right-4 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3">
                                {cartProducts.length}
                            </span>
                        )}
                    </Link>
                    <button
                        className="p-1 border"
                        onClick={() => setMobileNavOpen(prev => !prev)}>
                        <FaBarsStaggered />
                    </button>
                </div>
            </div>
            {mobileNavOpen && (
                <div
                    onClick={() => setMobileNavOpen(false)}
                    className="md:hidden p-4 bg-gray-300 rounded-lg mt-2 flex flex-col gap-2 text-center">
                    <Link href={'/'}>Home</Link>
                    <Link href={'/menu'}>Menu</Link>
                    <Link href={'/#about'}>About</Link>
                    <Link href={'/#contact'}>Contact</Link>
                    <AuthLinks status={status} userName={userName} />
                </div>
            )}
            <div className="header md:flex">
                <Link className='logo' href="">ST Pizza</Link>
                <nav className='header-nav'>
                    <Link href={'/'}>Home</Link>
                    <Link href={'/menu'}>Menu</Link>
                    <Link href={'/#about'}>About</Link>
                    <Link href={'/#contact'}>Contact</Link>
                </nav>
                <nav className="flex items-center gap-4 text-gray-500 font-semibold">
                    <AuthLinks status={status} userName={userName} />
                    <Link href={'/cart'} className="relative">
                        <IoCart className='text-2xl' />
                        {cartProducts?.length > 0 && (
                            <span className="absolute -top-2 -right-4 bg-primary text-white text-xs py-1 px-2 rounded-full leading-3">
                                {cartProducts.length}
                            </span>
                        )}
                    </Link>
                </nav>
            </div>
        </header>
    )
}
