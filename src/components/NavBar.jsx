import React, { useState } from 'react';
import RoundedBtn from '../common/RoundedBTN';
import { IoMdPerson } from 'react-icons/io';
import { CiBellOn } from 'react-icons/ci';
import { LuMessagesSquare } from 'react-icons/lu';
import { BsGearWideConnected } from 'react-icons/bs';
import { IoSearch } from 'react-icons/io5';
import { FaCompass, FaBars } from 'react-icons/fa';
import Logout from './NavButtons/Logout';
import { useNavigate } from 'react-router-dom';
import SideBar from './SideBar';

function NavBar() {
    const [isSidebarOpen, setSidebarOpen] = useState(false); 
    const [activeButton, setActiveButton] = useState(null); 
    const navigate = useNavigate(); 

    const openSidebar =  () => {
        setSidebarOpen(!isSidebarOpen);
    }

    const navigateToPage = (route) => {
        if (route && window.innerWidth >= 768) {
            navigate(route) 
        }
    }
    const handleButtonClick = (button, route) => {
        if (button !== 'settings' && button !== 'explore' && button !== 'chat') {
            openSidebar(); 
        }
        setActiveButton(button);
        navigateToPage(route);
    }
    
    const handleNav = () => {
        openSidebar();
    }

    const handleSidebarClose = () => {
        setSidebarOpen(false);
    }
    //<RoundedBtn icon={<CiBellOn/>}  onClick={() => handleButtonClick('notification')} />
  return (
<div>
    <div className='flex justify-between items-center relative z-10 p-4 bg-light-grey dark:bg-nav-black dark:border-gray-600'>
        <div className='flex md:flex-wrap space-x-4'>
        
        <RoundedBtn icon={<LuMessagesSquare/>} onClick={()=> handleButtonClick('chat','/chat')} />
        <RoundedBtn icon={<FaCompass/>} onClick={()=> handleButtonClick('explore','/explore')} /> 
        <RoundedBtn icon={<IoMdPerson/>} onClick={() => handleButtonClick('profile')}/>
        <RoundedBtn icon={<BsGearWideConnected/>} onClick={() => handleButtonClick('settings','/settings')}/>
        {/* <RoundedBtn icon={<IoSearch/>} onClick={() => handleButtonClick('search')} /> */}

        </div>
        <Logout className='hidden md:flex cursor-pointer'/> 
        </div>
        {isSidebarOpen && <SideBar activeButton={activeButton} onClose={handleSidebarClose} />} 
</div>

  );
};

export default NavBar