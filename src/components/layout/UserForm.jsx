import React, { useEffect } from 'react'
import { useState } from "react";
import EditableImage from '../EditableImage';
import { useSession } from 'next-auth/react';

export default function UserForm({ user, onSave }) {
    const [userName, setUserName] = useState('');
    const [image, setImage] = useState('');
    const [phone, setPhone] = useState(user?.phone || '');
    const [streetAddress, setStreetAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [admin, setAdmin] = useState(false);
    // const { data: loggedInUserData } = useProfile();


    // bcoz when the component was just initialized so the initial state
    // is undefined when the we get user value through session then update
    useEffect(() => {
        setUserName(user?.name)
        setImage(user?.image)
        setPhone(user?.phone)
        setStreetAddress(user?.streetAddress)
        setPostalCode(user?.postalCode)
        setCity(user?.city)
        setCountry(user?.country)
        setAdmin(user?.admin)
        // console.log(user)
    }, [user])

    return (
        <div className="md:flex gap-4">
            <div>
                <div className="p-2 rounded-lg relative max-w-[120px]">
                    <EditableImage image={image} setImage={setImage} />
                </div>
            </div>
            <form
                className="grow"
                onSubmit={ev =>
                    onSave(ev, {
                        name: userName, image, phone, admin,
                        streetAddress, city, country, postalCode,
                    })
                }
            >
                <label>
                    First and last name
                </label>
                <input
                    type="text" placeholder="First and last name"
                    value={userName} onChange={ev => setUserName(ev.target.value)}
                />
                <label>Email</label>
                <input
                    type="email"
                    disabled={true}
                    value={user?.email || ''}
                    placeholder={'email'}
                />
                <label>Phone</label>
                <input
                    disabled={false}
                    type="tel" placeholder="Phone number"
                    value={phone || ''} onChange={ev => setPhone(ev.target.value)} />
                <label>Street address</label>
                <input
                    disabled={false}
                    type="text" placeholder="Street address"
                    value={streetAddress || ''} onChange={ev => setStreetAddress( ev.target.value)}
                />
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <label>Postal code</label>
                        <input
                            disabled={false}
                            type="text" placeholder="Postal code"
                            value={postalCode || ''} onChange={ev => setPostalCode(ev.target.value)}
                        />
                    </div>
                    <div>
                        <label>City</label>
                        <input
                            disabled={false}
                            type="text" placeholder="City"
                            value={city || ''} onChange={ev => setCity(ev.target.value)}
                        />
                    </div>
                </div>
                <label>Country</label>
                <input
                    disabled={false}
                    type="text" placeholder="Country"
                    value={country || ''} onChange={ev => setCountry(ev.target.value)}
                />
                {/* {loggedInUserData.admin && ( */}
                <div>
                    <label className="p-2 inline-flex items-center gap-2 mb-2" htmlFor="adminCb">
                        <input
                            id="adminCb" type="checkbox" className="" value={'1'}
                            checked={admin}
                            onChange={ev => setAdmin(ev.target.checked)}
                        />
                        <span>Admin</span>
                    </label>
                </div>
                {/* )} */}
                <button type="submit">Save</button>
            </form>
        </div>
    )
}
