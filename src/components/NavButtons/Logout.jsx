import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import RoundedBTN from '../../common/RoundedBTN'
import { FaSignOutAlt } from 'react-icons/fa';


function Logout() {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate(); 

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen); 
    }
    const logoutUser = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/auth/logout', {
                method: 'POST',
                credentials:'include',
            });
            if (response.ok) {
                console.log("logged out")
                navigate("/login")
            } else {
                console.log("logout failed")
            }
        } catch (error) {
            console.log("Error: ",error)
        }
    }

  return (
    <div className='relative'>
         <RoundedBTN icon={<FaSignOutAlt />} onClick={() => {
        toggleDropdown(); // Toggle dropdown after clicking logout
      }} />
        {isDropdownOpen && (
        <div className="z-10 absolute top-8 right-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-[#272727]">
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                <li className="cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() =>{logoutUser()}}>
                Logout
                </li>
            </ul>
        </div>
        )}
    </div>
  );
}

export default Logout