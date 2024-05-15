import { useEffect } from 'react';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import axios from 'axios';
const colors = ['#526275', '#6B0842', '#A61F21', '#B8671F', '#D5DB8C', '#61B38F', '#2D924A', '#126FA2', '#56028F', "#ffffff"];


const Help = () => {
  const { authUser, setAuthUser } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState()
  const [textAreaValue, setTextAreaValue] = useState('')
  const [status, setStatus] = useState('')

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/users/${authUser}`);
        setUserDetails(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    if (authUser) {
      fetchUserDetails();
    }

  }, [authUser]);

  const handleInputChanges = (event) => {
    setTextAreaValue(event.target.value)
  }

  const submitRequest = async () => {
    if (!(/^\s*$/.test(textAreaValue))) {
      try {
        const response = await axios.post('http://localhost:3001/api/help', {
          username: userDetails.username,
          userID: userDetails._id,
          request: textAreaValue,
        });
        setStatus('Request sent successfully!');
      } catch (error) {
        console.error("Error sending request:", error);
        setStatus('Unable to send request: ' + error.message);
      } finally {
        setTimeout(() => {
          setStatus('');
        }, 5000);
      }
    } else {
      setStatus('Unable to send request: Empty Text Field');
      setTimeout(() => {
        setStatus('');
      }, 5000);
    }
    setTextAreaValue('');
  };

  return (
    <div className='max-w-[1400px] mt-[10px] w-full h-screen ov mx-auto text-center bg-gray-200 dark:bg-zinc-700 bg-[#272727] rounded-lg py-16'>
      <div className='w-full h-3/4 px-5'>
        <div className='text-4xl font-semibold antialiased text-gray-700 dark:text-white flex items-center md:col-span-6 py-5'>
          Help Request
        </div>
        <textarea
          className='bg-gray-400 dark:bg-[#272727] w-full h-1/2 p-4 border border-transparent dark:border-gray-500 rounded-md text-gray-700 dark:text-white resize-none'
          placeholder='Tell us about a problem...'
          onChange={handleInputChanges}
          value={textAreaValue}
        ></textarea>
        <button
          className='bg-green-500 hover:bg-green-700 text-stone-200 font-bold py-2 px-4 rounded mt-2'
          onClick={submitRequest}
        >
          Submit
        </button>
        <div className='text-white mt-2'>{status}</div>
      </div>
    </div>
  )
}

export default Help