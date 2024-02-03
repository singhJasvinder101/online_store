import Image from 'next/image'
import React from 'react'
import { LuArrowRightCircle } from "react-icons/lu";

export default function Hero() {
    return (
        <section className='hero'>
            <div className="py-8 md:py-12">
                <h1 className="text-4xl font-semibold">
                    Everything
                    is better<br />
                    with a&nbsp;
                    <span className="text-primary">
                        Pizza
                    </span>
                </h1>
                <p className="my-6 text-gray-500 text-sm">
                    Pizza is the missing piece that makes every day complete, a simple yet delicious joy in life
                </p>
                <div className="flex gap-4 text-sm">
                    <button className="flex justify-center bg-primary uppercase items-center gap-2 text-white px-4 py-2 rounded-full">
                        Order now
                        <LuArrowRightCircle className='text-xl' />
                    </button>
                    <button className="flex items-center border-0 gap-2 py-2 text-gray-600 font-semibold">
                        Learn more
                        {/* <LuArrowRightCircle className='text-xl' /> */}
                    </button>
                </div>
            </div>
            <div className="relative hidden featuredImageUrl md:block">
                <Image
                    src={'/pizza.png'}
                    alt={'pizza'}
                    style={{ objectFit: "contain" }}
                    placeholder="blur"
                    blurDataURL='/pizza.png'
                    fill
                    loading="lazy"
                    quality={70}
                />
            </div>
        </section>
    )
}
