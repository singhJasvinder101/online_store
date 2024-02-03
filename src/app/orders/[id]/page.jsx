"use client"

import SectionHeaders from '@/components/layout/SectionHeaders'
import React, { useContext, useEffect, useState } from 'react'
import { CartContext, cartProductPrice } from '@/components/AppContext'
import { useParams } from 'next/navigation'
import CartProduct from '@/components/layout/CartProduuct'
import UseProfile from '@/components/UseProfile'

export default function page() {
    const { clearCart } = useContext(CartContext)
    const [orderData, setOrderData] = useState()
    const [loadingOrder, setLoadingOrder] = useState(true);
    const { id } = useParams();

    const [address, setAddress] = useState({});
    const { data: profileData } = UseProfile();
    const [phone, setPhone] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');



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

    useEffect(() => {
        if (typeof window !== undefined) {
            // console.log(window.location.search.substring(1))
            if (window.location.search.substring(1) === "clear-cart=1") {
                clearCart()
            }
            if (id) {
                setLoadingOrder(true);
                fetch('/api/orders?_id=' + id).then(res => {
                    res.json().then(orderData => {
                        setOrderData(orderData);
                        setLoadingOrder(false);
                    });
                })
            }
        }
    }, [])

    let subtotal = 0;
    if (orderData?.cartProducts) {
        for (const product of orderData?.cartProducts) {
            subtotal += cartProductPrice(product);
        }
    }


    return (
        <section className="max-w-2xl mx-auto mt-8">
            <div className="text-center">
                <SectionHeaders sectionSubHeaders="Your order" />
                <div className="mt-4 mb-8">
                    <p>Thanks for your order.</p>
                    <p>We will call you when your order will be on the way.</p>
                </div>
            </div>
            {loadingOrder && (
                <div>Loading order...</div>
            )}
            {orderData && (
                <div className="grid md:grid-cols-2 md:gap-16">
                    <div>
                        {orderData.cartProducts.map(product => (
                            <CartProduct key={product._id} product={product} />
                        ))}
                        <div className="text-right py-2 text-gray-500">
                            Subtotal:
                            <span className="text-black font-bold inline-block w-8">${subtotal}</span>
                            <br />
                            Delivery:
                            <span className="text-black font-bold inline-block w-8">$5</span>
                            <br />
                            Total:
                            <span className="text-black font-bold inline-block w-8">
                                ${subtotal + 5}
                            </span>
                        </div>
                    </div>
                    <div>
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <form>
                                <label>Phone</label>
                                <input
                                    disabled={true}
                                    type="tel" placeholder="Phone number"
                                    value={phone || ''} onChange={ev => setPhone(ev.target.value)} />
                                <label>Street address</label>
                                <input
                                    disabled={true}
                                    type="text" placeholder="Street address"
                                    value={streetAddress || ''} onChange={ev => setStreetAddress(ev.target.value)}
                                />
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <label>Postal code</label>
                                        <input
                                            disabled={true}
                                            type="text" placeholder="Postal code"
                                            value={postalCode || ''} onChange={ev => setPostalCode(ev.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label>City</label>
                                        <input
                                            disabled={true}
                                            type="text" placeholder="City"
                                            value={city || ''} onChange={ev => setCity(ev.target.value)}
                                        />
                                    </div>
                                </div>
                                <label>Country</label>
                                <input
                                    disabled={true}
                                    type="text" placeholder="Country"
                                    value={country || ''} onChange={ev => setCountry(ev.target.value)}
                                />
                                
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}
