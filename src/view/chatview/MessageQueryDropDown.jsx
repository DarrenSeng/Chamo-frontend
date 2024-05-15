import React, { useState, useEffect, useRef } from 'react';
import { MdClose } from "react-icons/md";
import { scrollToElement } from './utils';

const MessageQueryDropdown = ({ msgList, setShowSearchInput, handleSelectMessage, chatContainerRef }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const dropdownRef = useRef(null);
  const messageRefs = useRef([]); // Add this line

  // Filter messages based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const filteredMessages = msgList.filter((message) =>
      message.message.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filteredMessages);
  }, [msgList, searchQuery]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSearchQuery('');
        setShowSearchInput(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle message selection
  const handleMessageSelection = (index) => {
    setSearchQuery('');
    setShowSearchInput(false);
    const selectedMessageRef = messageRefs.current[index];
    if (selectedMessageRef) {
      scrollToElement(chatContainerRef, selectedMessageRef);
    }
  };

  // Handle closing the search box
  const handleCloseSearch = () => {
    setSearchQuery('');
    setShowSearchInput(false);
  };

  return (
    <div ref={dropdownRef} className="absolute top-[-10px] right-[90px] bg-dark-grey shadow p-2 rounded-md text-black">
      <div className="flex justify-between items-center mb-2">
        <input
          type="text"
          placeholder="Search messages..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 rounded-md border border-gray-300 flex-1"
        />
        <button onClick={handleCloseSearch} className="text-gray-500 hover:text-gray-700">
          <MdClose />
        </button>
      </div>
      {searchQuery.trim() !== '' && (
        <>
          {searchResults.map((message, index) => (
            <div
              key={`${message.id}-${index}`}
              ref={(el) => (messageRefs.current[index] = el)}
              onClick={() => handleMessageSelection(index)}
              className="cursor-pointer p-2 hover:bg-med-green text-white"
            > 
              {message.message}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default MessageQueryDropdown;