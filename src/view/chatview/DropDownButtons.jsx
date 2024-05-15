import React, { useContext, useState, useEffect, useRef } from 'react';
import Report from '../chatview/Report';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthProvider';
import { HiDotsVertical } from "react-icons/hi";
import { getUserDetails } from '../../api/api';
import { blockUser, unblockUser,addFriend, cancelFriendRequest, 
  rejectFriendRequest, acceptFriendRequest, removeFriend } from '../../api/api';
import cookies from 'js-cookie'

function DropDownButtons({ getFriendStatusTowardsOtherUser, friendStatus,
  setFriendStatus, chatSessionArray, getUserChatSessions, currentUserAnonUsername, otherUserName,
  currentRoomID, userDetails, sendMsg, getBlockStatusTowardsOtherUser,
  blockStatus, setBlockStatus, icon, otherUID, onClick = () => {}, itemList = [] }) {
    const [ authUser, setAuthUser ] = useState(cookies.get('user'));
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [onReport, setOnReport] = useState(false);
  const [onReveal, setOnReveal] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null); // Reference to the dropdown element

  const handleDropdownToggle = () => {
    console.log("click");
    const newDropDown = !isDropdownOpen;
    console.log("newd", newDropDown);
    setIsDropdownOpen(newDropDown);
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await getUserDetails(authUser);
        //setUserDetails(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    const fetchBlockStatus = async () => {
      try {
        const status = await getBlockStatusTowardsOtherUser();
        setBlockStatus(status);
      } catch (error) {
        console.error("Error fetching block status:", error);
      }
    };
    const fetchFriendStatus = async () => {
      try {
        const status = await getFriendStatusTowardsOtherUser();
        setFriendStatus(status);
      } catch (error) {
        console.error("Error fetching block status:", error);
      }
    };
    if (authUser) {
      fetchUserDetails();
      fetchBlockStatus();
      fetchFriendStatus();
    }
  }, [authUser]);

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleBlockUser = async (blockOrUnblock) => {
    console.log("handleblockuser", blockOrUnblock);
    const currSessions = chatSessionArray;
    const requestBody = { currentUserID: authUser };
    if (blockOrUnblock === "Block") {
      const blockSuccess = await blockUser(otherUID, requestBody);
      console.log("block status is true", blockSuccess);
      setBlockStatus(true);
      sendMsg({
        username: userDetails.username,
        userID: userDetails._id,
        roomID: currentRoomID,
        message: `${currentUserAnonUsername} has blocked ${otherUserName}`,
        blockingFlag: true
      });
    } else if (blockOrUnblock === "Unblock") {
      try {
        const unblockSuccess = await unblockUser(otherUID, requestBody);
      } catch (error) {
        console.log("err", error);
      }
      setBlockStatus(false);
      sendMsg({
        username: userDetails.username,
        userID: userDetails._id,
        roomID: currentRoomID,
        message: `${currentUserAnonUsername} has unblocked ${otherUserName}`,
        blockingFlag: true
      });
    }
  };

  const handleAddFriend = async (addOrAcceptOrRemove) => {
    console.log("addacc", addOrAcceptOrRemove);
    console.log("otheruid", otherUID);
    const currSessions = chatSessionArray;
    if (addOrAcceptOrRemove === "Add Friend") {
      try {
        const requestStatus = await addFriend(currentRoomID, otherUID, authUser);
        setFriendStatus("Cancel Friend Request");
        sendMsg({
          username: userDetails.username,
          userID: userDetails._id,
          roomID: currentRoomID,
          message: `${currentUserAnonUsername} has sent a friend request to ${otherUserName}`
        });
      } catch (error) {
        console.log("er", error);
      }
    } else if (addOrAcceptOrRemove === "Cancel Friend Request") {
      console.log("cr", currentRoomID, otherUID, authUser);
      try {
        const requestStatus = await cancelFriendRequest(currentRoomID, otherUID, authUser);
        console.log("rqstatus", requestStatus);
        setFriendStatus("Add Friend");
        sendMsg({
          username: userDetails.username,
          userID: userDetails._id,
          roomID: currentRoomID,
          message: `${currentUserAnonUsername} has deleted the friend request`
        });
      } catch (error) {
        console.log("err", error);
      }
    } else if (addOrAcceptOrRemove === "Reject Friend Request") {
      console.log("cr", currentRoomID, otherUID, authUser);
      try {
        const requestStatus = await rejectFriendRequest(currentRoomID, otherUID, authUser);
        console.log("rqstatus", requestStatus);
        setFriendStatus("Add Friend");
        sendMsg({
          username: userDetails.username,
          userID: userDetails._id,
          roomID: currentRoomID,
          message: `${currentUserAnonUsername} has rejected the friend request`
        });
      } catch (error) {
        console.log("err", error);
      }
    } else if (addOrAcceptOrRemove === "Accept Friend Request") {
      try {
        const requestStatus = await acceptFriendRequest(currentRoomID, otherUID, authUser);
        console.log("rqstatus", requestStatus);
        setFriendStatus("Remove Friend");
        sendMsg({
          username: userDetails.username,
          userID: userDetails._id,
          roomID: currentRoomID,
          message: `${currentUserAnonUsername} has accepted the friend request`
        });
      } catch (error) {
        console.log("err", error);
      }
    } else if (addOrAcceptOrRemove === "Remove Friend") {
      try {
        const requestStatus = await removeFriend(currentRoomID, otherUID, authUser);
        setFriendStatus("Add Friend");
        sendMsg({
          username: userDetails.username,
          userID: userDetails._id,
          roomID: currentRoomID,
          message: `${currentUserAnonUsername} has removed ${otherUserName} from their friends list`
        });
      } catch (error) {
        console.log("err", error);
      }
    }
  };

  const handleItemClick = (item) => {
    console.log(`Clicked on ${item}`);
    switch (item) {
      case "Select Messages":
        break;
      case "Close Chat":
        navigate('/explore');
        break;
      case "Mute Notifications":
        break;
      case "Clear Chat":
        break;
      case "Delete Chat":
        break;
      case "Unblock":
        handleBlockUser("Unblock");
        break;
      case "Block":
        handleBlockUser("Block");
        break;
      case "Report":
        setOnReport(true);
        break;
      case "Add Friend":
        handleAddFriend("Add Friend");
        break;
      case "Remove Friend":
        handleAddFriend("Remove Friend");
        break;
      case "Cancel Friend Request":
        handleAddFriend("Cancel Friend Request");
        break;
      case "Accept Friend Request":
        handleAddFriend("Accept Friend Request");
        break;
      case "Reject Friend Request":
        handleAddFriend("Reject Friend Request");
        break;
    }
  };

  const handleClose = () => {
    setOnReport(false);
  };

  const handleCloseReveal = () => {
    setOnReveal(false);
  };

  return (
    <div ref={dropdownRef}>
      <button
        id="dropdownMenuIconButton"
        data-dropdown-toggle="dropdownDots"
        className="inline-flex items-center p-2 ml-1 text-sm font-medium text-center rounded-full hover:text-dark-grey hover:bg-light-green"
        type="button"
        onClick={handleDropdownToggle}
      >
        <HiDotsVertical size={25} />
      </button>
      {itemList.length > 0 && isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-light-green dark:divide-gray-600">
          <ul
            className="py-2 text-sm text-dark-grey dark:text-dark-grey"
            aria-labelledby="dropdownMenuIconButton"
          >
            {itemList.map((item, index) => (
              <li key={index}>
                {item === "Block" && blockStatus ? (
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-med-green dark:hover:bg-med-green"
                    onClick={() => handleItemClick("Unblock")}
                  >
                    Unblock
                  </a>
                ) : item === "Block" && !blockStatus ? (
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-med-green dark:hover:bg-med-green"
                    onClick={() => handleItemClick("Block")}
                  >
                    Block
                  </a>
                ) : item === "Add Friend" && friendStatus === "Add Friend" ? (
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-med-green dark:hover:bg-med-green"
                    onClick={() => handleItemClick("Add Friend")}
                  >
                    Send Friend Request
                  </a>
                ) : item === "Add Friend" && friendStatus === "Remove Friend" ? (
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-med-green dark:hover:bg-med-green"
                    onClick={() => handleItemClick("Remove Friend")}
                  >
                    Remove Friend
                  </a>
                ) : item === "Add Friend" && friendStatus === "Cancel Friend Request" ? (
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-med-green dark:hover:bg-med-green"
                    onClick={() => handleItemClick("Cancel Friend Request")}
                  >
                    Cancel Friend Request
                  </a>
                ) : item === "Add Friend" && friendStatus === "Accept/Reject Friend Request" ? (
                  <div>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-med-green dark:hover:bg-med-green"
                      onClick={() => handleItemClick("Accept Friend Request")}
                    >
                      Accept Friend Request
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-med-green dark:hover:bg-med-green"
                      onClick={() => handleItemClick("Reject Friend Request")}
                    >
                      Reject Friend Request
                    </a>
                  </div>
                ) : (
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-med-green dark:hover:bg-med-green"
                    onClick={() => handleItemClick(item)}
                  >
                    {item}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
      {onReport && (
        <Popup
          open={onReport}
          closeOnDocumentClick={false}
          closeOnEscape={false}
          position="right center"
          modal
        >
          {(close) => <Report onClose={close} />}
        </Popup>
      )}
    </div>
  );
}

export default DropDownButtons;