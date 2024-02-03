import Image from 'next/image'
import React, { useContext, useState } from 'react'
import { CartContext } from '../AppContext'

export default function MenuTile({ onAddToCart, item }) {
    const { image, description, name, basePrice = 0,
        sizes, extraIngredientPrices,
    } = item;
    return (
        <div className=" bg-gray-300  p-4 rounded-lg">
            <div className="text-center p-2"
                style={{ maxHeight: 'calc(100vh - 100px)' }}>
                <div className="text-center">
                    <Image
                        src={image}
                        alt='pizza'
                        width={150} height={200}
                        className="mx-auto" />
                </div>
                <h2 className="text-lg font-bold text-center mb-2">{name}</h2>
                <p className="max-h-[120px] line-clamp-3 text-center text-gray-500 text-sm mb-2">
                    {description}
                </p>
                <button onClick={() => {
                    onAddToCart(item)
                }} className='mt-4 bg-primary text-white rounded-full px-6 py-2'>
                    {sizes?.length > 0 || extraIngredientPrices?.length > 0 ? (
                        <span>Add to cart(from ${basePrice})</span>
                    ) : (
                        <span>Add to cart ${basePrice}</span>
                    )}
                </button>
            </div>
        </div>
    )
}
