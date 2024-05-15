import io from "socket.io-client"
import React, { useEffect, useState } from 'react'
import ChatButtons from "./ChatButtons";
import SidebarChatHeading from './SidebarChatHeading';
import ChatbarUser from './ChatbarUser';
import { CiSearch } from "react-icons/ci";
import { ImFolderDownload } from "react-icons/im";
import axios from "axios";

const socket = io.connect("https://chamo-app.adaptable.app/")


const ChatSideBar =({getFriendStatusTowardsOtherUser, 
    chatSessionArray, authUser,msgList,setMsgList,setOtherUserID,
    userDetails,setCurrentChatSession,renderMessage,currentRoomID,setCurrentRoomID}) => {
        const [searchQuery, setSearchQuery] = useState('');
        const [sortMode, setSortMode] = useState('chats');

        const handleSortModeChange = (mode) => {
            setSortMode(mode);
            console.log(`Sort mode changed to: ${mode}`);
            getFriends()
        };
    
    const joinRoom = (roomID) => {
        socket.emit('leaveRoom', currentRoomID)
        setCurrentRoomID(roomID)
        socket.emit("join-room", currentRoomID)
    }
	
	// when the user clicks on a user in the sidebar. sets the currentchatsession to that selected chat session and calls rendermessage based on that room id
    const handleSidebarUserEvent = async (event, index) => {
        try {
            setMsgList([]); 
            setOtherUserID(event.currentTarget.getAttribute('id'));
            const getUserID = event.currentTarget.getAttribute('id')
            const roomID = userDetails.roomList[index].roomID
            await joinRoom(roomID);
            //const newChatSession = chatSessionArray.find(session=> session.session.roomID == roomID)
            setCurrentChatSession(chatSessionArray.find(session=> session.session.roomID == roomID))
            await renderMessage(roomID);
        } catch (error) {
            console.log("Error: ", error);
        }
    };

    //userids and usernames list based on chat session array
    //useeffect whenever chatsession array updates.
    //if someone makes code so that sending a message updates the order of chatsessionarray,
       //the usernames and userids arrays' orders should be updated too
    const [userIDs, setUserIDs] = useState([])
    const [usernames, setUsernames] = useState([]); 
    const [datamap, setDatamap] = useState({})
    const [friendUsernames, setFriendUsernames] = useState([])

    useEffect(() => {
        //for each id in ids, get friend status of id. return is "Remove Friend",
            //add that id:username to the 
        const fetchUsernames = async () => {
            const data = await Promise.all(chatSessionArray.map(async (chatsession) => {
                return filterOtherID(chatsession);
            }));
            setDatamap(data)
            const ids = data.map(item => item.otherUserID);
            const fetchedUsernames = data.map(item => item.username);
            setUserIDs(ids);
            setUsernames(fetchedUsernames);
        };
        fetchUsernames();
    }, [chatSessionArray, msgList]);
    
    const getFriends = async () => {
            const friendStatusPromises = userIDs.map(id => getFriendStatusTowardsOtherUser(id));
            const friendStatuses = await Promise.all(friendStatusPromises);
            const friends = datamap.filter((item, index) => friendStatuses[index] === "Remove Friend");
            const friendNames = friends.map(friend => friend.username);
            console.log("friendnames", friendNames)
            setFriendUsernames(friendNames)
    }

    const filterOtherID = async (chatSession) => {
        const otherUserID = Object.keys(chatSession.session.userMap).find(id => id !== authUser);
        const username = chatSession.session.userMap[otherUserID]
        return {username, otherUserID};
    }
    

    return (
        <div key={msgList} className="flex flex-col border-r border-neutral-700 w-full h-screen">
            <div className="">
                <SidebarChatHeading handleSortModeChange={handleSortModeChange}/>
            </div>
            <div className='flex justify-between items-center bg-med-green dark:bg-light-green h-[60px] p-2'>
                <input
                    type="text"
                    placeholder='Find Users and Chats'
                    value = {searchQuery}
                    onChange={(e)=> {setSearchQuery(e.target.value)}}
                    className='rounded-lg bg[#86efac] text-black text-sm font-light outline none px-4 mx-5 py-2 flex-grow h-[35px] placeholder:text[#8795a1] placeholder:text-sm placeholder:font-light'
                />
                {/*<ChatButtons icon={<CiSearch size={30} />} />*/}
            </div>
            {/* Friendslist */}
            {sortMode=='chats' ? (
                <div className="flex flex-col overflow-y-auto h-full'">
                    {
                    usernames.filter(username => username.toLowerCase().includes(searchQuery.toLowerCase())
                    ).map((username, filteredIndex) => {
                    const index = usernames.indexOf(username)
                    //for friendslist, index=usernames.indexOf(friend)
                    const recentMessage = chatSessionArray[index].session.messages.length > 0 ? chatSessionArray[index].session.messages[chatSessionArray[index].session.messages.length - 1] : null;
                    const recentMsg = recentMessage ? recentMessage.message : '';
                    const timeStamp = recentMessage?.timeStamp ? recentMessage.timeStamp : Date.now();

                    return (
                        <ChatbarUser
                            key={filteredIndex}
                            msgList={msgList}
                            userID={userIDs[index]}
                            username={username} 
                            recentMsg={recentMsg}
                            timeAndDate={timeStamp}
                            onClick={(event) => handleSidebarUserEvent(event,index)}
                            />
                        );
                        })}
                    </div>
            ) : 
                <div className="flex flex-col overflow-y-auto h-full'">
                {
                friendUsernames.filter(username => username.toLowerCase().includes(searchQuery.toLowerCase())
                ).map((username, filteredIndex) => {
                const index = usernames.indexOf(username)
                //for friendslist, index=usernames.indexOf(friend)
                const recentMessage = chatSessionArray[index]?.session.messages.length > 0 ? chatSessionArray[index].session.messages[chatSessionArray[index].session.messages.length - 1] : null;
                const recentMsg = recentMessage ? recentMessage.message : '';
                const timeStamp = recentMessage?.timeStamp ? recentMessage.timeStamp : Date.now();

                return (
                    <ChatbarUser
                        key={filteredIndex}
                        msgList={msgList}
                        userID={userIDs[index]}
                        username={username} 
                        recentMsg={recentMsg}
                        timeAndDate={timeStamp}
                        onClick={(event) => handleSidebarUserEvent(event,index)}
                        />
                    );
                })}
            </div>
             }
            <div>
            </div>
        </div>
    )
}

export default ChatSideBar;