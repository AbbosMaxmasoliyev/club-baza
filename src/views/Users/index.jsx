import CreateUser from 'components/template/CreateUser'
import UserItem from 'components/template/UserItem'
import React, { useEffect, useState } from 'react'
import { HiUserCircle } from 'react-icons/hi'
import { useParams } from 'react-router-dom'
import { createCleint, getUsers } from 'services/client.service'




const Users = () => {
    const { clubId } = useParams()
    return (
        <div className='flex flex-col '>

            <UserItem />

        </div>
    )
}

export default Users