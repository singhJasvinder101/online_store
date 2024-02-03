"use client"

import { CartContext, cartProductPrice } from '@/components/AppContext';
import UseProfile from '@/components/UseProfile';
import CartProduct from '@/components/layout/CartProduuct';
import SectionHeaders from '@/components/layout/SectionHeaders';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';

export default function page() {
    const { cartProducts, removeCartProduct } = useContext(CartContext);
    const [address, setAddress] = useState({});
    const { data: profileData } = UseProfile();
    const [phone, setPhone] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (window.location.href.includes('canceled=1')) {
                toast.error('Payment failed 😔');
            }
        }
    }, []);

    useEffect(() => {
        if (profileData?.email) {
            setPhone(profileData?.phone)
            setStreetAddress(profileData?.streetAddress)
            setPostalCode(profileData?.postalCode)
            setCity(profileData?.city)
            setCountry(profileData?.country)
            setAddress({
                phone,
                streetAddress,
                postalCode,
                city,
                country,
            })
        }
    }, [profileData]);


    let subtotal = 0;
    for (const p of cartProducts) {
        subtotal += cartProductPrice(p);
    }

    async function proceedToCheckout(e) {
        e.preventDefault();
        const toastId = toast.loading('Loading...');
        try {
            const { data } = await axios.post('/api/checkout', {
                address,
                cartProducts,
            })
            toast.success('Proceeding Payment');
            // console.log(data)
            window.location = data
        } catch (error) {
            toast.error('Some error occurred!');
        } finally {
            toast.dismiss(toastId);
        }
    }
    if (cartProducts?.length === 0) {
        return (
            <section className="mt-8 text-center">
                <SectionHeaders mainHeader="Cart" />
                <p className="mt-4">Your shopping cart is empty 😔</p>
            </section>
        );
    }

    return (
        <div>
            <section className="mt-8">
                <Toaster />
                <div className="text-center">
                    <SectionHeaders sectionSubHeaders="Cart" />
                </div>
                <div className="mt-8 grid gap-8 grid-cols-2">
                    <div>
                        {cartProducts?.length === 0 && (
                            <div>No products in your shopping cart</div>
                        )}
                        {cartProducts?.length > 0 && cartProducts.map((product, index) => (
                            <CartProduct
                                key={index}
                                product={product}
                                index={index}
                                onRemove={removeCartProduct}
                            />
                        ))}
                        <div className="py-2 pr-16 flex justify-end items-center">
                            <div className="text-gray-500">
                                Subtotal:<br />
                                Delivery:<br />
                                Total:
                            </div>
                            <div className="font-semibold pl-2 text-right">
                                ${subtotal}<br />
                                $5<br />
                                ${subtotal + 5}
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg">
                        <h2>Checkout</h2>
                        <form onSubmit={proceedToCheckout}>
                            <label>Phone</label>
                            <input
                                disabled={false}
                                type="tel" placeholder="Phone number"
                                value={phone || ''} onChange={ev => setPhone(ev.target.value)} />
                            <label>Street address</label>
                            <input
                                disabled={false}
                                type="text" placeholder="Street address"
                                value={streetAddress || ''} onChange={ev => setStreetAddress(ev.target.value)}
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
                            <button type="submit">Pay ${subtotal + 5}</button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}
