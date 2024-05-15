import { useEffect } from 'react';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import axios from 'axios';
import Select from 'react-select';
const colors = ['#526275', '#6B0842', '#A61F21', '#B8671F', '#D5DB8C', '#61B38F', '#2D924A', '#126FA2', '#56028F', "#ffffff"];
const Reveal = () => {
  const { authUser, setAuthUser } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState()
  const [textAreaValue, setTextAreaValue] = useState('')
  const [status, setStatus] = useState('')
  const [isOpen, setIsOpen] = useState(false)

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
    console.log(userDetails)
    if (!(/^\s*$/.test(textAreaValue))) {
      try {
        const response = await axios.post('http://localhost:3001/api/report', {
          username: userDetails.username,
          userID: userDetails._id,
          request: textAreaValue,
        });
        setStatus('Report form sent successfully!');
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

  const close = async () => setIsOpen(false);

  return (
    <div className='max-w-[1400px] mt-[10px] w-3/4 h-3/4 ov mx-auto text-center bg-[#ffffff] rounded-lg py-16'>
      <div className='w-3/4 h-3/4 px-12'>
        
         <div className='text-xl font-normal text-black flex items-center md:col-span-6 py-5'>
          Do You Want To Reveal Profile?
        </div> 
        <button
          className='bg-grey-500 hover:bg-grey-700 text-stone-200 font-bold py-2 px-4 rounded mt-2'
          onClick={close}>
         Cancel
        </button> 
        <button
          className='bg-green-300 hover:bg-green-500 text-stone-150 font-normal py-2 px-4 rounded mt-2'
          onClick={submitRequest}
        >
          Request
        </button>
        <div className='text-black mt-2'>{status}</div>
      </div>
    </div>
  )
}

export default Reveal