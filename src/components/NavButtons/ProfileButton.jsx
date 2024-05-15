import { useEffect } from 'react';
import React from 'react'
import { IoPersonCircle } from 'react-icons/io5';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import axios from 'axios';

const personalityTypes = [
  "ISTJ", "ISFJ", "INFJ", "INTJ",
  "ISTP", "ISFP", "INFP", "INTP",
  "ESTP", "ESFP", "ENFP", "ENTP",
  "ESTJ", "ESFJ", "ENFJ", "ENTJ"
];

function ProfileButton() {
  const { authUser } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [topics, setTopics] = useState([]);
  const [bio, setBio] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [location, setLocation] = useState("");
  const [iconColor, setIconColor] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/users/${authUser}`);
        setUserDetails(response.data);
        setUsername(response.data.username);
        setLastName(response.data.lastName);
        setFirstName(response.data.firstName);
        setBio(response.data.bio || "");
        setAge(response.data.age || "");
        setLocation(response.data.location || "");
        setTopics(response.data.topics || []);
        setSelectedType(response.data.personalityTypes && response.data.personalityTypes[0] ? response.data.personalityTypes[0] : "");
        setIconColor(response.data.iconColor || ""); // Set iconColor with the fetched value
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [authUser]);

  return (
    <div className='text-white'>
      <div className='flex justify-center p-3'>
        <IoPersonCircle color={iconColor} size='130' />
      </div>
      <div className='flex justify-center p-2 font-bold'>
        {firstName} {lastName}
      </div>
      <div className='px-8 py-2 italic'>
        @{username}
      </div>
      <div className='flex justify-center space-x-1 px-32 py-2'>
        <span className='flex items-center px-3 py-1 text-xs bg-[#313131] text-white border border-white rounded-full shadow-sm italic'>
          Active <span className='inline-block w-2 h-2 bg-green-500 rounded-full ml-2'></span>
        </span>
      </div>
      <div className=''>
        <p className='font-bold px-7'>BIO</p>
      </div>
      <div className='text-left px-10'>
        <p>Age: {age || "N/A"}</p>
        <p>Location: {location || "N/A"}</p>
        <p>Personality Type: {selectedType || "N/A"}</p>
        <p>About Me: {bio || "N/A"}</p>
        <p>Interests:</p>
        <div className='flex flex-wrap'>
          {topics.map((topic, index) => (
            <span key={index} className='px-3 py-1 text-xs bg-[#313131] text-white border border-white rounded-full shadow-sm mr-2 mb-2'>
              {topic}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProfileButton