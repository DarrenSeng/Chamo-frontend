import io from "socket.io-client"
import React, { useEffect, useState, useContext, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import NavBar from '../../components/NavBar';
import "../../css/style.css"
import { AuthContext } from '../../context/AuthProvider';
import axios from "axios";
import 'reactjs-popup/dist/index.css';
import ChatRoom from "./ChatRoom";
import ChatSideBar from "./ChatSideBar";
import ProfileModal from "./ProfileModal";
import { getUserDetails,getChatSession, getFriendStatus, getBlockStatus,loadingMessages } from "../../api/api";
import cookies from 'js-cookie'

const socket = io.connect("https://chamo-app.adaptable.app/")

let barSearchValue = ''



const Chat = ({ user,passedRoomID, topicName }) => {
    const [ authUser, setAuthUser ] = useState(cookies.get('user'));
    console.log("authuser",authUser)
    const [chatSessionArray, setChatSessionArray] = useState([])
    const [currentChatSession,setCurrentChatSession] = useState([])
    const [msgList, setMsgList] = useState([])
    const [userDetails, setUserDetails] = useState(user)
    const initialRoomID = passedRoomID || userDetails.roomList[0]?.roomID;
    const [currentRoomID, setCurrentRoomID] = useState(initialRoomID)
    const room = userDetails.roomList.find(room => room.roomID === initialRoomID);
    const [otherUserID, setOtherUserID] = useState(room?.userID)
    const [message, setMessage] = useState('')
    const [recentMsg, setRecentMsg] = useState('')
    const navigate = useNavigate();
    const [showProfileModal,setShowProfileModal] = useState(false)
    const [iconColor, setIconColor] = useState("black")


    //if this function is triggered from a renderchat from chatsidebar component, it will set currentchatsession to that selected room
    //if this function does not have a selectedID prop because the user just navigates to chat page by default, it selects first chatsession in array
    const getUserChatSessions = async (selectedRoomID = null) => {
        try {
            const trueUserDetails = await getUserDetails(authUser)
            setUserDetails(trueUserDetails.data)
            const promises = trueUserDetails.data.roomList.map(async (room) => {
                try {
                    const chatSession = await getChatSession(room.roomID);
                    return chatSession;
                } catch (error) {
                    return null; 
                }
            });
            const array = await Promise.all(promises);
            const filteredArray = array.filter(session => session !== null);
            setChatSessionArray(filteredArray);
            if (selectedRoomID) {
              setCurrentChatSession(filteredArray.find((session) => session.session.roomID == selectedRoomID));
            } else {
                setCurrentChatSession(filteredArray[0])
            }
            const status = await getFriendStatusTowardsOtherUser();
                setFriendStatus(status);
        } catch (error) {
            console.error('Error fetching chat sessions:', error);
        }
    }
    
    const getFriendStatusTowardsOtherUser = async (passedOtherID = null) => {
        if (passedOtherID == null ) {
            passedOtherID = otherUserID
        }
        const response = await getFriendStatus(passedOtherID, authUser)
        if (response.data.status == 'add') {
            return "Add Friend"
        } else if (response.data.status == 'remove') {
            return "Remove Friend"
        } else if (response.data.status == 'accept/reject') {
            return "Accept/Reject Friend Request"
        } else if (response.data.status == 'cancel') {
            return "Cancel Friend Request"
        } else {
            console.log("response error", response.data)
            return "Error"
        }
    }

    const getBlockStatusTowardsOtherUser = async () => {
        const response = await getBlockStatus(otherUserID, authUser);
        if (response.data.isBlocked == true) {
            console.log("you blocked them", response.data.isBlocked)
            setBlockStatus(true)
            return true
        } else {
            setBlockStatus(false)
            return false
        }
    }

    const getBlockStatusOtherUserTowardsYou = async () => {
        const response = await getBlockStatus(authUser, otherUserID); 
        if (response.data.isBlocked == true) {
            return true
        } else {
            return false
        }
    }

    useEffect(() => {
        getUserChatSessions()
    }, [])
    
    const [isLoading, setIsLoading] = useState(true);    
    const [blockStatus, setBlockStatus] = useState(null); // Initialize with null or a default value
    const [friendStatus, setFriendStatus] = useState("") //initialized thru useeffect to be implemented
    useEffect(() => {
        const fetchFriendStatus = async () => {
            try {
                const status = await getFriendStatusTowardsOtherUser();
                setFriendStatus(status);
            } catch (error) {
                console.error("Error fetching block status:", error);
            }
        };
        fetchFriendStatus();
        return () => {
        };
    }, []);

    useEffect(() => {
        const fetchIconColor = async () => {
            try {
                const response = await getUserDetails(otherUserID)
                const iconColor = response.data.iconColor || ""; 
                setIconColor(iconColor);
            } catch (error) {
                console.error('Error fetching icon color:', error);
            }
        };
    
        fetchIconColor();
    }, [otherUserID]);

    useEffect(() => {
        const fetchBlockStatus = async () => {
            try {
                const status = await getBlockStatusTowardsOtherUser();
                setBlockStatus(status);
            } catch (error) {
                console.error("Error fetching block status:", error);
            }
        };
        fetchBlockStatus();
        return () => {
        };
    }, []);



    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await getUserDetails(authUser)
                setUserDetails(response.data);
                console.log("chat page fetch")
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };
        fetchUserDetails();
    }, [authUser]);

    useEffect(() => {
        getUserChatSessions(currentRoomID);
    }, [msgList]);

    useEffect(() => {
        const receiveMsgHandler = (data) => {
            setMsgList((list) => [...list, data]);
        };
        socket.on("receive-msg", receiveMsgHandler);
        getUserChatSessions(currentRoomID)
        return () => {
            socket.off("receive-msg", receiveMsgHandler);
        };
    }, [socket]);


    useEffect(() => {
        return () => {
            socket.on("receive-upmsg", (data) => {
                setMsgList((list) => [...list, data])
            })
        }
    }, [socket])    



    useEffect(() => {
        return () => {
            socket.on("receive-delmsg", (data) => {
                setMsgList((list) => [...list, data])
            })
        }
    }, [socket])

    const handledelMsg = (data) => {
        setMessage('')
    }

    const [inputValue, setInputValue] = useState('');

    const handleBarValue = (value) => {
        setInputValue(value);
    };

    const handleSearchBarClick = () => {
        console.log(barSearchValue)
        barSearchValue = ''
    };
    
    async function renderMessage(currentRoomID) {
        try {
            if (!currentRoomID) {
                setIsLoading(false);
                return;
            }
            let requestData = {
                roomID: currentRoomID,
                usersID: [userDetails._id, otherUserID],
            };
            if (topicName) {
                requestData.topicName = topicName;
            }
            const responseMsg = await loadingMessages(requestData);
            responseMsg.forEach((elem, index) => {
                const msgData = {
                    username: elem.username,
                    userID: elem.userID,
                    roomID: elem.currentRoomID,
                    message: elem.message,
                }
                setMsgList((list) => [...list, msgData])
            })
            setIsLoading(false)
            getUserChatSessions(currentRoomID)
            navigate(`/chat/${currentRoomID}`);
        } catch (error) {
            console.error('Error fetching messages:', error);
            setIsLoading(false);
        }
    }

    const sendMsg = async (data) => {
        if (data.message !== "") {
            try {
                const blockStatusTowardsOtherUser = await getBlockStatusTowardsOtherUser();
                const blockStatusFromOtherUser = await getBlockStatusOtherUserTowardsYou();
                if (data?.blockingFlag == true || 
                    !(blockStatusFromOtherUser == true || blockStatusTowardsOtherUser == true)) {
                    setMsgList([...msgList, data])
                    setRecentMsg(data)
                    await socket.emit('send-msg', data, otherUserID)
                    setMessage('') 
                    getUserChatSessions(currentRoomID)  
                } else {
                    console.log("blocked")
                } 
            } catch(error) {
                console.log("error getting block status,",error)
            }
        }

    }

    useEffect(() => { //needed to render chat page load
        if (!currentRoomID) {
        } else {
        socket.emit('join-room', currentRoomID)
        renderMessage(currentRoomID)
        }
    }, [])

    return (
        <div className="flex flex-col h-screen">
            <NavBar />
            <div className="flex flex-1 bg-[#191919] overflow-hidden">
                <div className="bg-med-green dark:bg-light-green min-w-[340px] max-w-[500px] w-full">
                    <ChatSideBar
                        getFriendStatusTowardsOtherUser={getFriendStatusTowardsOtherUser}
                        friendStatus={friendStatus}
                        setFriendStatus={setFriendStatus}
                        chatSessionArray={chatSessionArray}
                        authUser={authUser}
                        msgList={msgList}
                        setMsgList={setMsgList}
                        setOtherUserID={setOtherUserID}
                        userDetails={userDetails}
                        setCurrentChatSession={setCurrentChatSession}
                        renderMessage={renderMessage}
                        currentRoomID={currentRoomID}
                        setCurrentRoomID={setCurrentRoomID}
                    />
                </div>
                <div className="flex-1 bg-[#313131] dark:bg-light-grey flex">
                    <div className="flex-1 max-h-full overflow-y-auto">
                        {!isLoading && (
                            <ChatRoom
                            iconColor={iconColor}
                                getFriendStatusTowardsOtherUser={getFriendStatusTowardsOtherUser}
                                friendStatus={friendStatus}
                                setFriendStatus={setFriendStatus}
                                chatSessionArray={chatSessionArray}
                                getBlockStatusTowardsOtherUser={getBlockStatusTowardsOtherUser}
                                blockStatus={blockStatus}
                                setBlockStatus={setBlockStatus}
                                currentChatSession={currentChatSession}
                                authUser={authUser}
                                msgList={msgList}
                                userDetails={userDetails}
                                setMsgList={setMsgList}
                                setUserDetails={setUserDetails}
                                message={message}
                                setMessage={setMessage}
                                currentRoomID={currentRoomID}
                                otherUserID={otherUserID}
                                setOtherUserID={setOtherUserID}
                                renderMessage={renderMessage}
                                isLoading={isLoading}
                                sendMsg={sendMsg}
                                recentMsg={recentMsg}
                                setRecentMsg={setRecentMsg}
                                getUserChatSessions={getUserChatSessions}
                                setShowProfileModal={setShowProfileModal}
                                showProfileModal={showProfileModal}
                            />
                        )}
                    </div>
                    {showProfileModal && (
                        <div className="bg-white shadow-lg z-10 transition-all duration-300 transform translate-x-0" style={{ width: '33%' }}>
                            <ProfileModal
                                onClose={() => setShowProfileModal(false)}
                                showProfileModal={showProfileModal}
                                userDetails={userDetails}
                                otherUserID={otherUserID}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
    };
export default Chat