
"use client"
import { getUsers } from '@/services/apiServices/userService'
import { instance } from '@/services/axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'

interface Address {
  street: string
  suite: string
  city: string
  zipcode: string
  geo: {
    lat: string
    lng: string
  }
}

interface Company {
  name: string
  catchPhrase: string
  bs: string
}

interface User {
  id: number
  address: Address
  email: string
  name: string
  phone: string
  username: string
  website: string
  company: Company
}

interface UsersProps {
  initialUsers: User[]
}


const Users = ({initialUsers}:UsersProps) => {
    const navigate = useRouter();
    
    const handleNavigation = (userId: number) => {
        navigate.push(`/user/${userId}`);
    }
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 transition-shadow duration-300 p-4">
        {initialUsers.map((user) => (
          <div
            onClick={() => handleNavigation(user.id)}
           key={user.id} className="w-full overflow-hidden bg-slate-200 rounded-lg shadow-md hover:scale-[1.1] cursor-pointer transition-transform duration-300">
            <div className="p-4">
              <h2 className="text-slate-900 text-xl font-bold">{user.name}</h2>
              <p className="text-gray-900">{user.email}</p>
              <p className="text-gray-800">{user.phone}</p>
              <p className="text-gray-800">{user.website}</p>
              <p className="text-gray-800">Address: {user.address.street}, {user.address.city}</p>
            </div>
          </div>
        ))}
      </div>
    )
  }
  

export default Users