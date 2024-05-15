import React, { useEffect, useState, useContext, useRef } from 'react';
import axios from "axios";
import { IoPersonCircle } from 'react-icons/io5';
import { getUserDetails } from '../../api/api';


const ProfileModal = ({ onClose, otherUserName, showProfileModal, userDetails, otherUserID }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [realUsername, setRealUsername] = useState('');
  const [age, setAge] = useState(''); 
  const [topics, setTopics] = useState([]);
  const [bio, setBio] = useState('');
  const [selectedType, setSelectedType] = useState([]);
  const [location, setLocation] = useState('');
  const [iconColor, setIconColor] = useState('');

  useEffect(() => {
    const fetchOtherUserDetails = async () => {
      try {
          const response = await getUserDetails(otherUserID);
          setFirstName(response.data.firstName)
          setLastName(response.data.lastName)
          setRealUsername(response.data.username)
          setAge(response.data.age)
          setTopics(response.data.topics)
          setBio(response.data.bio)
          setSelectedType(response.data.personalityTypes)
          setLocation(response.data.location)
          setIconColor(response.data.iconColor || "");
      } catch (error) {
          console.error('Error fetching user details:', error);
      }
  };
    fetchOtherUserDetails();
}, [otherUserName]); //might only be based on otherusername

  const isOtherUserFriend = userDetails.friendList.includes(otherUserID);

  return (
    <div
      className={`fixed top-0 right-0 h-full bg-med-green dark:bg-light-green shadow-lg z-40 transition-all duration-300 transform ${
        showProfileModal ? 'translate-x-0' : 'translate-x-full'
      }`}
      style={{ width: '100%' }}
    >
      <div className="flex items-center justify-between mb-4 p-4 bg-light-green h-[60px] dark:bg-med-green">
      <h2 className="text-lg font-bold text-dark-grey dark:text-dark-grey">
          {isOtherUserFriend ? `${realUsername}` : `${otherUserName}`}
        </h2>
        <button
          onClick={onClose}
          className="text-dark-grey dark:text-dark-grey hover:bg-med-green dark:hover:bg-light-green rounded-full p-2"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className='text-dark-grey'>
        <div className='flex justify-center p-3'>
          <IoPersonCircle color={iconColor} size='130' />
        </div>
        <div className='flex justify-center p-2 font-bold'>
          {isOtherUserFriend ? `${firstName} ${lastName}` : ""}
        </div>
        <div className='px-8 py-2 italic'>
          {isOtherUserFriend ? `@${realUsername}` : otherUserName}
        </div>
        <div className='flex justify-center space-x-1 px-32 py-2'></div>
        <div className=''>
          <p className='font-bold px-7'>BIO</p>
        </div>
        {isOtherUserFriend ? (
          <div className='text-left px-10'>
            <p>Age: {age}</p>
            <p>Location: {location}</p>
            <p>Personality Type: {selectedType}</p>
            <p>About Me: {bio}</p>
            <p>Interests:</p>
            <div className='flex flex-wrap'>
              {topics.map((topic, index) => (
                <span
                  key={index}
                  className='px-3 py-1 text-xs bg-[#313131] text-light-green border border-dark-grey rounded-full shadow-sm mr-2 mb-2'
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div className='text-center px-10'>
            <p>This user has a dark and mysterious past. Send them a friend request to learn more!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileModal;