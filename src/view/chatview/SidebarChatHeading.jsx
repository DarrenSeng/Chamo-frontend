import React from 'react'
import { IoChatbubbles } from "react-icons/io5";
import { IoPeople } from "react-icons/io5";
import ChatButtons from './ChatButtons';

const SidebarChatHeading = ({ handleSortModeChange }) => {
  return (
    <div className="flex justify-between relative ">
      <h1 className='text-2xl font-semibold mx-3 my-3'>Chat</h1>
      <div className="flex justify-end items-center px-2 w-24">
        <ChatButtons icon={<IoChatbubbles size={30} />} onClick={() => handleSortModeChange('chats')} />
        <ChatButtons icon={<IoPeople size={30} />} onClick={() => handleSortModeChange('friends')} />
      </div>
    </div>
  );
};

export default SidebarChatHeading