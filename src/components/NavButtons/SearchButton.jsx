import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { IoSearch, IoPerson } from "react-icons/io5";
import axios from 'axios';
import Searchbar from '../../common/SearchBar';
import { getUserDetails, searchForTopicOrUser, sendRequestToUserPost } from '../../api/api';
import cookies from 'js-cookie'

const SearchButton = () => {
  const [ authUser, setAuthUser ] = useState(cookies.get('user'));
  const [currentUser, setUserDetails] = useState(null);
  const [users, setUserList] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await getUserDetails(authUser)
        setAuthUser(response.data._id);
        setUserDetails(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    }

    if (authUser) {
      fetchUserDetails();
    }
  }, [authUser]);

  const handleSearchBarValue = (data) => {
    setInputValue(data);
  }

  const findTopicOrUser = async () => {
    const userList = await searchForTopicOrUser(inputValue);
    setUserList(userList);
    setInputValue('');
  }

  const sendRequestToUser = async (otherUserID) => {
    try {
      await sendRequestToUserPost(otherUserID, authUser);
  } catch (error) {
      console.error('Error sending request to user:', error);
  }
  }

  const UserContainer = () => {
    return (
      <div className='text-white font-2xl'>
        {users.map((elem, index) => (
          <div className='flex justify-between py-4 rounded-lg hover:bg-[#313131]' key={index}>
            <div className="w-fit h-fit p-4 ml-4 mr-3 text-center rounded-full border border-white">
              <IoPerson size={35} />
            </div>
            <div className='flex justify-between w-full pl-2'>
              <div>
                <h2 className='font-bold text-xl py-2'>{elem.username}</h2>
                <button onClick={() => sendRequestToUser(elem._id)} className='hover:bg-green-600 hover:border-0 hover:text-black text-sm border rounded-lg border-white px-2 py-1'>
                  {currentUser.requestList.includes(elem._id) ? (<p>Request Sent</p>) : (<p>Send Friend Request</p>)}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div>
      <Searchbar
        icon={<IoSearch size={32} />}
        additionalStyle={'border-white m-2 text-white'}
        text = {'Search for a User'}
        onInputChange={handleSearchBarValue}
        onSubmit={findTopicOrUser}
      />
      <UserContainer />
    </div>
  );
};

export default SearchButton;