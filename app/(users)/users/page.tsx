
import { getUsers } from '@/services/apiServices/userService';
import { instance } from '@/services/axios';
import Users from '@/views/Users';
import React from 'react'

const UsersPage = async () => {
    const getUserRes = await instance(getUsers({params: { page: 1, limit: 10 }}));
  const initialUsers = getUserRes.data;
  return (
    <div>
        <Users initialUsers={initialUsers} />
    </div>
  )
}

export default UsersPage