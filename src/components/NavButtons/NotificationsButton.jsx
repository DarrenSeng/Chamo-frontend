import React, { useState, useEffect } from 'react';
import { IoPerson } from "react-icons/io5";
import axios from 'axios';
import io from "socket.io-client"

function NotificationsButton({ user }) {
  const [notifications, setNotifications] = useState([]);

  // Get notifications when a page is loaded
  useEffect(() => {
    const socket = io.connect("http://localhost:3001")
    socket.emit('join-noti-room')

    socket.on('new-notification', (notification) => {
      setNotifications((prevNotifications) => [...prevNotifications, notification]);
    });

    const fetchNotifications = async () => {
      try {
        const response = await axios.post('http://localhost:3001/api/notifications/get_notifications', {
          userID: user
        });
        setNotifications(response.data.requestList);
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
    await axios.post(`http://localhost:3001/api/users/add_user/${otherUserID}`, {
        currentUserID: user
    }).then(() => {
    }).catch((error) => {
        console.log(error)
    })
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