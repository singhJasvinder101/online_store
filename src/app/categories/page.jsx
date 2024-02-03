"use client"

import DeleteButton from '@/components/DeleteButton'
import UseProfile from '@/components/UseProfile'
import UserTabs from '@/components/layout/UserTabs'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

export default function Page() {
    const { data: profileData, adminInfoLoading: loading } = UseProfile()
    const [categoryName, setCategoryName] = useState('')
    const [categories, setCategories] = useState([])
    const [editedCategory, setEditedCategory] = useState(false)

    useEffect(() => {
        fetchCategories();
    }, []);

    function fetchCategories() {
        fetch('/api/categories').then(res => {
            res.json().then(categories => {
                setCategories(categories);
            });
        });
    }

    if (loading) {
        return 'Loading...'
    }

    if (!profileData?.admin) {
        return 'Not An Admin'
    }

    async function handleCategorySubmit(e) {
        e.preventDefault()
        try {
            const { data } = await axios.post('/api/categories',
                { name: categoryName },
                { withCredentials: true }
            )
            if (data?.success) {
                toast.success('Profile saved!');
            } else {
                toast.error(data?.error?.name?.message)
            }
            fetchCategories();
        } catch (error) {
            console.log(error)
            toast.error(error.message);
        }
    }

    async function handleEditCategorySubmit(e) {
        e.preventDefault()
        try {
            const { data } = await axios.put('/api/categories',
                { name: categoryName, _id: editedCategory._id },
                { withCredentials: true }
            )
            if (data?.success) {
                toast.success(data.message);
            } else {
                toast.error(data?.error?.name?.message)
            }
            fetchCategories();
        } catch (error) {
            console.log(error)
            toast.error(error.message);
        }
    }

    async function handleDeleteClick(e, id) {
        try {
            const { data } = await axios.delete('/api/categories',
                { data: { _id: id } },
                { withCredentials: true }
            )
            if (data?.success) {
                toast.success(data.message);
            }
            fetchCategories();
        } catch (error) {
            console.log(error)
            toast.error(error.message);
        }
    }

    return (
        <div>
            <Toaster />
            <section className="mt-8">
                <UserTabs isAdmin={profileData?.admin} />
                <form className="mt-8" onSubmit={editedCategory ? handleEditCategorySubmit : handleCategorySubmit}>
                    <div className="flex gap-2 items-end">
                        <div className="grow">
                            <label htmlFor="">
                                {editedCategory ? 'Update category' : 'New category name'}
                                {editedCategory && (
                                    <>: <b>{editedCategory.name}</b></>
                                )}
                            </label>
                            <input type="text"
                                value={categoryName}
                                onChange={ev => setCategoryName(ev.target.value)}
                            />
                        </div>
                        <div className="pb-2 flex gap-2">
                            <button className="border border-primary" type="submit">
                                {editedCategory ? 'Update' : 'Create'}
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setEditedCategory(null);
                                    setCategoryName('');
                                }}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
                <div>
                    <h2 className="mt-8 text-sm text-gray-500">Existing categories</h2>
                    {categories?.length > 0 && categories.map(c => (
                        <div
                            key={c._id}
                            className="bg-gray-100 rounded-xl p-2 px-4 flex gap-1 mb-1 items-center">
                            <div className="grow">
                                {c.name}
                            </div>
                            <div className="flex gap-1">
                                <button type="button"
                                    onClick={() => {
                                        setEditedCategory(c);
                                        setCategoryName(c.name);
                                    }}
                                >
                                    Edit
                                </button>
                                <DeleteButton
                                    className='text-primary'
                                    label="Delete"
                                    onDelete={(e) => handleDeleteClick(e, c._id)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}
