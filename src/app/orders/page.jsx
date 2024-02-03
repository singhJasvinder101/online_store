"use client"

import UseProfile from '@/components/UseProfile'
import UserTabs from '@/components/layout/UserTabs'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'

export default function Page() {
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const { data: profileData, adminInfoLoading: loading } = UseProfile()


  useEffect(() => {
    fetchOrders();
  }, []);

  function fetchOrders() {
    setLoadingOrders(true);
    fetch('/api/orders').then(res => {
      res.json().then(orders => {
        setOrders(orders.reverse());
        setLoadingOrders(false);
      })
    })
  }

  function dbTimeForHuman(str) {
    return str.replace('T', ' ').substring(0, 16)
  }

  console.log(orders)

  return (
    <div>
      <Toaster />
      <section className="mt-8 max-w-2xl mx-auto">
        <UserTabs isAdmin={profileData.admin} />
        <div className="mt-8">
          {loadingOrders && (
            <div>Loading orders...</div>
          )}
          {orders?.length > 0 && orders.map(order => (
            <div
              key={order._id}
              className="bg-gray-100 mb-2 p-4 rounded-lg flex flex-col md:flex-row items-center gap-6">
              <div className="grow flex flex-col md:flex-row items-center gap-6">
                <div>
                  <div className={
                    (order.paid ? 'bg-green-500' : 'bg-red-400')
                    + ' p-2 rounded-md text-white w-24 text-center'
                  }>
                    {order.paid ? 'Paid' : 'Not paid'}
                  </div>
                </div>
                <div className="grow">
                  <div className="flex gap-2 items-center mb-1">
                    <div className="grow">{order.userEmail}</div>
                    <div className="text-gray-500 text-sm">{dbTimeForHuman(order.createdAt)}</div>
                  </div>
                  <div className="text-gray-500 text-xs">
                    {order.cartProducts.map(p => p.name).join(', ')}
                  </div>
                </div>
              </div>
              <div className="justify-end flex gap-2 items-center whitespace-nowrap">
                <Link href={"/orders/" + order._id} className="button">
                  Show order
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
