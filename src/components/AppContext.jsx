"use client"

import { SessionProvider } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import toast from 'react-hot-toast'

export const CartContext = createContext({})

export function cartProductPrice(cartProduct) {
    let price = cartProduct.basePrice;
    if (cartProduct.quantity) {
        price = cartProduct.basePrice * cartProduct.quantity;
    }
    if (cartProduct.size) {
        price += cartProduct.size.price;
    }
    if (cartProduct.extras?.length > 0) {
        for (const extra of cartProduct.extras) {
            price += extra.price;
        }
    }
    return price;
}

export default function AppContext({ children }) {
    const [cartProducts, setCartProducts] = useState([])

    // to initially fetch the setcartproducts we need to fetch from local
    // storage first 
    let ls;
    useEffect(() => {
        ls = typeof window !== undefined ? window.localStorage : null

        if (ls && ls.getItem('cart')) {
            setCartProducts(JSON.parse(ls.getItem('cart')))
            // console.log(JSON.parse(ls.getItem('cart')))
        }
    }, [])

    function saveCartToLocalStorage(cartProducts) {
        if (ls) {
            ls.setItem('cart', JSON.stringify(cartProducts))
        }
    }

    function addToCart(product, size = null, extras = []) {
        setCartProducts(prevProducts => {
            console.log(prevProducts)
            const existingProduct = prevProducts?.find(
                (p) => p._id === product._id
            );
            console.log(existingProduct)

            let newProducts = [];
            if (existingProduct && !size && !extras.length) {
                existingProduct.quantity += 1;
                newProducts = [...prevProducts]
                saveCartToLocalStorage(newProducts)
                return newProducts;
            }else {
                newProducts =  [...prevProducts, { ...product, size, extras, quantity: 1 }]
                saveCartToLocalStorage(newProducts)
                return newProducts

            }


        })
    }

    function clearCart() {
        setCartProducts([])
        saveCartToLocalStorage([])
    }
    // clearCart()

    function removeCartProduct(indexToRemove) {
        console.log(indexToRemove)
        setCartProducts(prevProducts => {
            const newProducts = prevProducts.filter((val, idx) => idx !== indexToRemove)
            saveCartToLocalStorage(newProducts);
            return newProducts;
        })
        toast.success("product removed")
    }

    return (
        <SessionProvider>
            <CartContext.Provider value={{
                cartProducts,
                setCartProducts,
                addToCart,
                clearCart,
                removeCartProduct,
                cartProductPrice
            }}>
                {children}
            </CartContext.Provider>
        </SessionProvider>
    )
}
