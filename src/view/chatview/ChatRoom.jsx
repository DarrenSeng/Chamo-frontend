import io from "socket.io-client"
import React, { useEffect, useState, useContext, useRef } from 'react'
import { IoEllipsisVerticalCircleSharp, IoPerson } from "react-icons/io5";
import { HiDotsVertical } from "react-icons/hi";
import { MdSearch, MdSend, MdOutlinePeopleAlt } from "react-icons/md";
import { BiHappy } from "react-icons/bi";
import { FaPlus } from "react-icons/fa6";
import DropDownButtons from "./DropDownButtons";
import DropTopButton from "./DropTopButtons";
import { FaCamera, FaFile } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
import ChatButtons from "./ChatButtons";

const socket = io.connect("http://localhost:3001")


//This component will be a children in parent component "Chat"
//Responsible for rendering the main chat window
const ChatRoom = ({getFriendStatusTowardsOtherUser, friendStatus,
    setFriendStatus, getBlockStatusTowardsOtherUser, blockStatus, 
    setBlockStatus, currentChatSession, authUser,msgList,userDetails,setMsgList,
    setUserDetails,message,setMessage,currentRoomID, otherUserID, setOtherUserID, renderMessage, sendMsg,
    getUserChatSessions, chatSessionArray, setShowProfileModal,  showProfileModal, iconColor
}) => {
        const [currentUserAnonUsername, setCurrentUserAnonUsername] = useState('')
        const [otherUserName, setOtherUserName] = useState(''); //Public/Anonymous Username
        const [visibleOptionsIndex, setVisibleOptionsIndex] = useState(null);
        const [showEmojiPicker, setShowEmojiPicker] = useState(false);
        
    
        useEffect(() => {
            renderMessage(currentRoomID)
        }, [])
    
        const handleToggleOption = (index) => {
            setVisibleOptionsIndex((prevIndex) => (prevIndex === index ? null : index));
        };
    
        const upMsg = async () => { 
            if (message !== "") {
                const msgData = {
                    username: userDetails.username,
                    roomID: currentRoomID,
                    message: message
                }
                setMsgList((list) => [msgData])
                await socket.emit("up-msg", msgData)
                setMessage('')
            }
        }
    
        const delMsg = async () => {
            if (message == "") {
                const msgData = {
                    username: userDetails.username,
                    userID: userDetails._id,
                    roomID: currentRoomID,
                    message: message,
                }
                setMsgList((list) => [msgData])
                await socket.emit("del-msg", msgData)
                setMessage('')
            }
        }
    
    	//handles input. if user presses enter, it sends the message
        const handleKeyPress = async (e) => {
            setMessage(e.target.value)
            if (e.key === 'Enter') {
                e.preventDefault()
                try {
                    setShowEmojiPicker(false); 
                        sendMsg({
                            username: userDetails.username,
                            userID: userDetails._id,
                            roomID: currentRoomID,
                            message: message
                    });
                } catch(error) {
                    console.log("error getting block status,",error)
                }
            }
        }

        const handleRevealReq = async(e) => {

        }
    
        const toggleEmojiPicker = () => {
            setShowEmojiPicker(!showEmojiPicker); 
        }
    
        const handleEmojiClick = (emojiObject) => {
            setMessage((prevValue) => prevValue + emojiObject.emoji);
        }
    	
	//when currentchatsession prop is altered by this component or other components, this useeffect runs. the chat partner's username is displayed
    useEffect(() => {
        const fetchData = async () => {
            if (currentChatSession.session && currentChatSession.session.userMap) {
                const otherUserID = Object.keys(currentChatSession.session.userMap).find(id => id !== authUser);
                const otherUserUsername = currentChatSession.session.userMap[otherUserID];
                setOtherUserName(otherUserUsername);
                const currentUserAnonUsername =  currentChatSession.session.userMap[authUser];;
                setCurrentUserAnonUsername(currentUserAnonUsername);
            }
        };
    
        fetchData();
    }, [currentChatSession]);

        const chatContainerRef = useRef(null);
        useEffect(() => {
            if (chatContainerRef && chatContainerRef.current) {
                chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
            }
        }, [msgList]);
        
        const handleProfileIconClick = () => {
            if (showProfileModal) {
                setShowProfileModal(false);
            } else {
                setShowProfileModal(true);
            }
        }; 

        return (
            <div className='flex flex-col h-full w-full'>
                {/* Contact Bar */}
                <div className='flex justify-between bg-med-green dark:bg-dark-grey text-dark-grey dark:text-white h-[60px] p-3'>
                  {/* Contact Info */}
                  <div className='flex items-center'>
                    {/* Picture of contact */}
                    <button onClick={handleProfileIconClick}>
                      <IoPerson size={45} color={iconColor} className='rounded-full mr-5' />
                    </button>
                    {/* Info */}
                    <div className='flex justify-between w-[300px]'>
                      <h1 className='text-black dark:text-white font-medium'>{otherUserName}</h1>
                    </div>
                    {currentChatSession.session && currentChatSession.session.topicName !== null ? (
                        <h1 className="text-black dark:text-white font-medium">Matching Topic: {currentChatSession.session.topicName}</h1>
                    ) : ''}
                  </div>
                  <div className='flex items-center'>

                  <h1 className='text-black pr-3 dark:text-white font-medium'>You: {currentUserAnonUsername}</h1>
                    <DropDownButtons
                      getFriendStatusTowardsOtherUser={getFriendStatusTowardsOtherUser}
                      friendStatus={friendStatus}
                      setFriendStatus={setFriendStatus}
                      chatSessionArray={chatSessionArray}
                      currentUserAnonUsername={currentUserAnonUsername}
                      otherUserName={otherUserName}
                      currentRoomID={currentRoomID}
                      userDetails={userDetails}
                      sendMsg={sendMsg}
                      getBlockStatusTowardsOtherUser={getBlockStatusTowardsOtherUser}
                      blockStatus={blockStatus}
                      setBlockStatus={setBlockStatus}
                      icon={<HiDotsVertical />}
                      otherUID={otherUserID}
                      itemList={['Add Friend','Block', 'Report',]}
                    />
                  </div>
                </div> 
                <div className='flex-1 bg-[#f7fee7] dark:bg-off-white  overflow-y-auto h-full' ref={chatContainerRef}>
                    {msgList.map((data, index) => {
                        const isSender = data.username === userDetails.username;
                        return (
                            <div key={index} className={`flex mb-4 px-2 ${isSender ? 'flex-row-reverse' : 'flex-row'}`}>
                              <div
                                className={`rounded-xl p-5 px-4 py-2 max-w-xl border ${
                                  isSender
                                    ? 'text-black bg-sender bg-blue-200 border-blue-400'
                                    : 'text-black bg-light-green bg-receiver border-[#7c9a6e]'
                                }`}
                              >
                                {data.message}
                              </div>
                                {isSender && (
                                    <div className="group inline-block">
                                    </div>
                                )} 
                                {visibleOptionsIndex === index && (
                                    <div>
                                        <button onClick={upMsg}>Update</button>
                                        <button onClick={delMsg}>Delete</button>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div> 
                <div className='flex items-center bg-light-green dark:bg-light-grey w-full h-[70px] p-3'>
                    <div className="px-2">
                    <ChatButtons icon={<BiHappy size={25} />} onClick={toggleEmojiPicker} />
                    </div>
                    {showEmojiPicker && (
                        <div className="absolute bottom-20 left-30">
                            <EmojiPicker onEmojiClick={handleEmojiClick} />
                        </div>
                    )} 
                    {/*<DropTopButton icon={<FaPlus />} itemList={[<FaFile size={25} />, 
                    <MdSend size={25} />, <FaCamera size={25} />]} />*/}
                    <input
                        type="text"
                        placeholder='Type a message'
                        className='bg-[#dcfce7] dark:bg-slate-100 rounded-xl outline-none text-sm text-black w-full h-full px-3 placeholder:text-sm placeholder:text-black'
                        value={message}
                        onChange={e=> setMessage(e.target.value)}
                        onKeyDown={handleKeyPress}
                        autoFocus
                    />
                    <span className="px-2">
                        <ChatButtons icon={<MdSend size={25} />} onClick={() => sendMsg({
                            username: userDetails.username,
                            userID: userDetails._id,
                            roomID: currentRoomID,
                            message: message
                        })} />
                    </span>
                </div>
            </div>
        );
    };


export default ChatRoom;