import React from 'react'
import { useState, useContext, useEffect } from 'react';
import { IoPerson } from "react-icons/io5";
import axios from 'axios';
import { AuthContext } from '../../context/AuthProvider';
import { getUserDetails } from '../../api/api';
import cookies from 'js-cookie'

const Blocklist = () => {
    const blockedUsers = ['User1', 'User2', 'User3', 'User4', 'User5', 'User6',]; // Replace with your actual blocked user list

    const [ authUser, setAuthUser ] = useState(cookies.get('user'));
    const [user, setUserDetails] = useState(null);
    const [blockedList, setBlockedList] = useState([])

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await getUserDetails(authUser)
                setUserDetails(response.data);
                setBlockedList(response.data.blockedList || [])
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        }
        if (authUser) {
            fetchUserDetails();
        }
    }, [authUser])

    const handleUnblockButton = () => {
        console.log()
    }

    const BlockedUser = () => {
        return (
            <ul className='list-none text-left'>
                {blockedUsers.map((user, index) => (
                    <li key={index} className='text-white border border-off-white dark:border-black py-6 px-5'>
                        <div className='flex justify-between'>
                            <div className='w-28 flex justify-between content-center'>
                                <IoPerson size={40} />
                                <h1 className='self-center'>{user}</h1>
                            </div>
                            <button onClick={handleUnblockButton} className='bg-red-500 hover:bg-red-700 text-stone-200 font-bold py-2 px-4 rounded'>Unblock</button>
                        </div>
                    </li>
                ))}
            </ul>
        )
    }

    return (
        <div className='max-w-[1400px] mt-[10px] w-full h-screen mx-auto text-center bg-gray-200 dark:bg-dark-grey rounded-lg py-10'>
            <div className='w-full h-3/4 px-5'>
                <div className='text-xl font-normal text-gray-700 dark:text-white grid-cols-1 md:col-span-6'>
                    <h1 className='text-4xl font-bold text-gray-700 dark:text-white mb-4 py-3'>Blocked Users</h1>
                    <div className='bg-gray-600 h-72 text-xl font-normal text-white md:col-span-6 overflow-scroll'>
                        <BlockedUser />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Blocklist