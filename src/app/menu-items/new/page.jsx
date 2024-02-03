"use client"

import UseProfile from '@/components/UseProfile';
import MenuItemForm from '@/components/layout/MenuItemForm';
import UserTabs from '@/components/layout/UserTabs';
import axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { redirect } from "next/navigation";

export default function page() {
    const { data: profileData, adminInfoLoading: loading } = UseProfile()
    const [redirectToItems, setRedirectToItems] = useState(false);

    async function handleFormSubmit(ev, dataa) {
        ev.preventDefault(); 
        const toastId = toast.loading('Loading...');
        try {
            const { data } = await axios.post('/api/menu-items', dataa);
            if (data?.success) {
                toast.success('Menu Item saved!');
                setRedirectToItems(true);
            } else {
                toast.error(
                    data?.error?.name?.message ||
                    data?.error?.image?.message ||
                    data?.error?.description?.message ||
                    data?.error?.basePrice?.message)
            }
        } catch (error) {
            console.log(error);
            toast.error('Some error occurred!');
        } finally {
            toast.dismiss(toastId);
        }
    }


    if (loading) {
        return 'Loading...'
    }

    if (!profileData.admin) {
        return 'Not An Admin'
    }
    if (redirectToItems) {
        return redirect('/menu-items');
    }

    return (
        <section className="mt-8">
            <Toaster />
            <UserTabs isAdmin={true} />
            <div className="max-w-2xl mx-auto mt-8">
                <Link href={'/menu-items'} className="button">
                    {/* <Left /> */}
                    <span>Show all menu items</span>
                </Link>
            </div>
            <MenuItemForm menuItem={null} onSubmit={handleFormSubmit} />
        </section>
    )
}
