import React, { useState, useEffect } from 'react';
import { IoPerson } from "react-icons/io5";
import { AuthContext } from '../../context/AuthProvider';
import axios from 'axios';
import io from "socket.io-client"
import { getUserDetails, fetchUserNotifications, addNewUser } from '../../api/api';


function NotificationsButton({ user }) {
  const [notifications, setNotifications] = useState([]);

  // Get notifications when a page is loaded
  useEffect(() => {
    const socket = io.connect("https://chamo-app.adaptable.app/")
    socket.emit('join-noti-room')

    socket.on('new-notification', (notification) => {
      setNotifications((prevNotifications) => [...prevNotifications, notification]);
    });

    const fetchNotifications = async () => {
      try {
        const notifications = await fetchUserNotifications(user);
        setNotifications(notifications);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();

    // Clean up by disconnecting the socket when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, [user]); 

  const addUser = async (otherUserID) => {
    try {
      await addNewUser(otherUserID, user);
  } catch (error) {
      console.error('Error adding new user:', error);
  }
}

  const UserContainer = () => {
    return (
      <div class='text-white font-2xl'>
        {notifications.map((elem, index) => (
          <div class='flex justify-between mx-3 py-4'>
            <div class="w-fit h-fit p-4 mr-2 text-center rounded-full border border-white ">
              <IoPerson size={42} />
            </div>
            <div class='flex justify-between w-full pl-2'>
              <div>
                <h2 className='font-bold text-xl py-2'>{elem.username}</h2>
                <button onClick={() => addUser(elem.id)} className='hover:bg-green-600 hover:border-0 hover:text-black text-sm border border-white px-2 py-1'>
                  Accept Request
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className='text-white'>
      <h1 className='text-2xl px-5 py-2'>Notifications</h1>
      <ul>
        <li>
          <UserContainer />
        </li>
      </ul>
    </div>
  );
}

export default NotificationsButton