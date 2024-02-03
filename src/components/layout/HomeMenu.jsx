"use client"

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import MenuItem from '../menu/MenuItem'
import SectionHeaders from './SectionHeaders'

export default function HomeMenu() {
    const [bestSellers, setBestSellers] = useState([])
    useEffect(() => {
        fetch('/api/menu-items').then(res => {
            res.json().then(menuItems => {
                // console.log(menuItems)
                setBestSellers(menuItems?.menuItems?.slice(-3))
            })
        })
    }, [])
    return (
        <section>
            <div className="absolute left-0 right-0 w-full justify-start">
                <div className="absolute left-0 -top-[70px] text-left -z-10">
                    <Image src={'/sallad1.png'} width={109} height={189} alt={'sallad'} />
                </div>
                <div className="absolute right-0 -top-[100px] -z-10">
                    <Image src={'/sallad2.png'} width={107} height={195} alt={'sallad'} />
                </div>
            </div>

            <SectionHeaders
                sectionHeaders="Check out"
                sectionSubHeaders="Our BestSellers"
            />
            <div className="my-8 grid sm:grid-cols-3 gap-4">
                {bestSellers?.length > 0 && bestSellers.map((item, idx) => (
                    <MenuItem key={idx} {...item} />
                ))}
            </div>

        </section>
    )
}
