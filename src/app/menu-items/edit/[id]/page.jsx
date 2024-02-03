"use client"

import DeleteButton from '@/components/DeleteButton'
import UseProfile from '@/components/UseProfile'
import MenuItemForm from '@/components/layout/MenuItemForm'
import UserTabs from '@/components/layout/UserTabs'
import axios from 'axios'
import Link from 'next/link'
import { redirect, useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

export default function Page() {
    const { id } = useParams()
    const { data: profileData, adminInfoLoading: loading } = UseProfile()
    const [menuData, setMenuData] = useState({
        name: '',
        image: '',
        description: '',
        basePrice: 0,
        category: ''
    })
    const [redirectToItems, setRedirectToItems] = useState(false);

    useEffect(() => {
        fetch('/api/menu-items').then(res => {
            res.json().then(menuItems => {
                const menuItem = menuItems.menuItems.find(item => item._id === id);
                setMenuData(menuItem)
            });
        })
    }, []);

    async function handleFormSubmit(ev, dataa) {
        ev.preventDefault();
        dataa = { ...dataa, _id: id }
        const toastId = toast.loading('Loading...');
        try {
            const { data } = await axios.put('/api/menu-items', dataa);
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

    async function handleDeleteClick(e) {
        e.preventDefault();
        const toastId = toast.loading('Loading...');
        try {
            const { data } = await axios.delete('/api/menu-items/?_id=' + id);
            if (data?.success) {
                toast.success('Menu Item deleted!');
                setRedirectToItems(true);
            }
        } catch (error) {
            console.log(error);
            toast.error('Some error occurred!');
        } finally {
            toast.dismiss(toastId);
        }
    }

    if (redirectToItems) {
        return redirect('/menu-items');
    }


    if (loading) {
        return 'Loading...'
    }

    if (!profileData.admin) {
        return 'Not An Admin'
    }

    return (
        <section className="mt-8 max-w-2xl mx-auto">
            <Toaster />
            <UserTabs isAdmin={profileData.admin} />
            <div className="max-w-2xl mx-auto mt-8">
                <Link href={'/menu-items'} className="button">
                    {/* <Left /> */}
                    <span>Show all menu items</span>
                </Link>
            </div>
            <MenuItemForm menuItem={menuData} onSubmit={handleFormSubmit} />
            <div className="max-w-md mx-auto mt-2">
                <div className="max-w-xs ml-auto pl-4">
                    <DeleteButton
                        label="Delete this menu item"
                        onDelete={handleDeleteClick}
                    />
                </div>
            </div>
        </section>
    )
}
