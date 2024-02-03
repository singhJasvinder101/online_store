"use client"
import UseProfile from '@/components/UseProfile'
import UserForm from '@/components/layout/UserForm'
import UserTabs from '@/components/layout/UserTabs'
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

export default function Page() {
    const { data: profileData, adminInfoLoading: loading } = UseProfile()
    const { id } = useParams()
    const [user, setUser] = useState()

    useEffect(() => {
        fetch('/api/profile/?id=' + id).then(res => {
            res.json().then(user => {
                // console.log(user)
                setUser(user)
            })
        })
    }, [])

    async function handleUpdateUser(e, data) {
        e.preventDefault()
        try {
            const { data: response } = await axios.put('/api/profile', { ...data, _id: id })
            if (response) {
                toast.success('User saved!');
            } else {
                toast.error(response.error)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message);
        }
    }

    if (loading) {
        return 'Loading...'
    }

    if (!profileData.admin) {
        return 'Not An Admin'
    }

    return (
        <section className="max-w-2xl mx-auto mt-8">
            <Toaster />
            <UserTabs isAdmin={profileData.admin} />
            <UserForm user={user} onSave={handleUpdateUser} />
        </section>
    )
}
