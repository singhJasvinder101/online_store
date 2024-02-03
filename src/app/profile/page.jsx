"use client"

import UserForm from '@/components/layout/UserForm';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from "react-hot-toast";
import { redirect } from "next/navigation";
import UserTabs from '@/components/layout/UserTabs';

export default function page() {
    const session = useSession();

    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [profileFetched, setProfileFetched] = useState(false);
    const { status } = session;

    useEffect(() => {
        const user = session.data?.user
        setUser(user)

        if (status === 'authenticated') {
            setUser(session.data?.user);
            fetch('/api/profile')
                .then(response =>
                    response.json())
                .then(data => {
                    setUser(prevUser => ({ ...prevUser, ...data }));
                    setIsAdmin(data.admin);
                    setProfileFetched(true);
                })
        }
    }, [session, status]);

    async function handleProfileInfoUpdate(ev, dataa) {
        ev.preventDefault();
        try {
            if (!dataa.name) {
                throw new Error("Enter the valid name")
            }
            try {
                const { data } = await axios.put('/api/profile', dataa);
                if (data) {
                    toast.success('Profile saved!');
                } else {
                    toast.error('Error saving profile');
                }
            } catch (error) {
                console.log(error)
                toast.error('Error saving profile');
            }
        } catch (err) {
            toast.error(err.message);
        }
    }

    if (status === 'loading' || !profileFetched) {
        return 'Loading...';
    }

    if (status === 'unauthenticated') {
        return redirect('/login');
    }


    return (
        <div>
            <Toaster />
            <section className="mt-8">
                <UserTabs isAdmin={isAdmin} />
                <div className="max-w-2xl mx-auto mt-8">
                    <UserForm user={user} onSave={handleProfileInfoUpdate} />
                </div>
            </section>
        </div>
    )
}
