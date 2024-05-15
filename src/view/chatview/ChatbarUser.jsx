import React, { useEffect, useState } from 'react';
import { IoPerson } from 'react-icons/io5';
import axios from 'axios';

const ChatbarUser = ({ userID, username, recentMsg, timeAndDate, onClick }) => {
  const [dateComponents, setDateComponents] = useState({});
  const [displayFormat, setDisplayFormat] = useState('');
  const [dullState, setDullState] = useState(false);
  const [iconColor, setIconColor] = useState('');

  useEffect(() => {
    const dateObject = new Date(timeAndDate);
    const currentDate = new Date();
    const timeDifference = currentDate - dateObject;
    const hoursDifference = timeDifference / (60 * 60 * 1000);
    const isOlderThan12Hours = hoursDifference > 12;
    const isYesterday = currentDate.getDate() - dateObject.getDate() === 1;
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const seconds = dateObject.getSeconds();
    const milliseconds = dateObject.getMilliseconds();

    setDateComponents({ year, month, day, hours, minutes, seconds, milliseconds });
    setDisplayFormat(isOlderThan12Hours ? 'date' : (isYesterday ? 'yesterday' : 'time'));
  }, [timeAndDate]);

  useEffect(() => {
    const fetchUserProfileColor = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/users/${userID}`);
        setIconColor(response.data.iconColor);
      } catch (error) {
        console.error('Error fetching user profile color:', error);
      }
    };

    fetchUserProfileColor();
  }, [userID]);

  const formatTime = () => {
    if (dateComponents.hours === undefined || dateComponents.minutes === undefined) {
      return '';
    }
    const ampm = dateComponents.hours >= 12 ? 'PM' : 'AM';
    const formattedHours = (dateComponents.hours % 12) || 12;
    const formattedMinutes = dateComponents.minutes.toString().padStart(2, '0');
    return `${formattedHours.toString().padStart(2, '0')}:${formattedMinutes} ${ampm}`;
  };

  return (
    <div id={userID} className='flex justify-between items-center cursor-pointer w-full h-[85px] px-3 hover:bg-[#f0f9e9]' onClick={onClick}>
      {/* Profile Picture */}
      <IoPerson size={40} color={iconColor} className='rounded-full w-[50px] mr-5' />
      {/* Info */}
      <div className='flex justify-between border-t border-neutral-700 w-full h-full py-3'>
        {/* Contact name and recentmsg */}
        <div className='flex flex-col justify-between text-black'>
          <h1 className='font-medium'>{username}</h1>
          {<p className='text-sm'>{recentMsg}</p>}
        </div>
        <div className='flex flex-col justify-between items-end h-full text-sx'>
          {displayFormat === 'date' ? (
            <p className='text-[#4c0519]'>
              {dateComponents.year}-{dateComponents.month}-{dateComponents.day}
            </p>
          ) : displayFormat === 'yesterday' ? (
            <p className='text-[#4c0519]'>Yesterday</p>
          ) : (
            <p className='text-[#4c0519]'>{formatTime()}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatbarUser;