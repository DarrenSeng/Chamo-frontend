import React, {useEffect, useState, useContext} from 'react'
import * as Fa from 'react-icons/fa';
import Chat from '../view/chatview/Chat';
import NotificationsButton from './NavButtons/NotificationsButton';
import Settings from '../view/settingsview/Settings';
import ProfileButton from './NavButtons/ProfileButton';
import SearchButton from './NavButtons/SearchButton';
import Logout from './NavButtons/Logout';
import Explore from '../view/Explore';
import io from "socket.io-client"
import { AuthContext } from '../context/AuthProvider';
import axios from "axios";
import { getUserDetails } from '../api/api';
import cookies from 'js-cookie'

const api_url = 'https://chamo-app.adaptable.app/' 
const socket = io.connect(api_url)

const SideBar = ({activeButton, onClose}) => {  
  const [ authUser, setAuthUser ] = useState(cookies.get('user'));
     useEffect(() => {
         const fetchUserDetails = async () => {
             try {
                 const response = await getUserDetails(authUser)
                 setAuthUser(response.data._id)
             } catch (error) {
                 console.error("Error fetching user details:", error);
             }
         }
         if (authUser) {
             fetchUserDetails();
         }
     }, [authUser])

    let content = null;
    switch (activeButton) {
        case 'notification':
          content = <NotificationsButton user={authUser} />;
          break;
        case 'messages':
          content = <Chat />;
          break;
        case 'explore':
          content = <Explore />;
          break;
        case 'profile':
          content = <ProfileButton />;
          break;
        case 'setting':
          content = <Settings />;
          break;
        case 'search':
          content = <SearchButton/>
          break; 
        case 'logout':
          content = <Logout />;
          break;
        default:
          content = null;
      }

return (
    <div className={`bg-[#191919] bg-[#272727] border border-gray-700 h-screen w-[340px] lg:w-[500px] sm:w-[430px] fixed top-0 left-0 z-20 flex flex-col`}>
      {activeButton && (
        <div onClick={onClose} className="bg-[#191919] text-white p-8 flex items-center cursor-pointer">
          <div onClick={onClose}>
            <Fa.FaArrowLeft size={27} />
          </div>
        </div>
      )}
      {content}
    </div>
  );
};


export default SideBar;