import React, { useEffect, useState, useContext } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './TopicItem.css';
import { useNavigate } from 'react-router-dom';
import io from "socket.io-client";
import { AuthContext } from '../context/AuthProvider';


const TopicItem = ({ name, image, description }) => {
    const {authUser, setAuthUser} = useContext(AuthContext);
    const [showInfo, setShowInfo] = useState(false);
    const [onPopup, setOnPopup] = useState(false);
    const [initialRoomID, setInitialRoomID] = useState("");
    const navigate = useNavigate();
    const [otherUserID, setOtherUserID] = useState("");
    const [socket, setSocket] = useState(null);
    const [loading, setLoading] = useState(false); 

    const arrayBufferView = new Uint8Array(image.data);
    const blob = new Blob([arrayBufferView], { type: image.contentType });
    const imageUrl = URL.createObjectURL(blob);

    const connectSocket = async () => {
        const newSocket = io.connect("http://localhost:3001");
        setSocket(newSocket);
    };

    useEffect(() => {
        connectSocket();
    }, []);

    const mouseLeaveOperations = () => {
        if (!loading) {
            setShowInfo(false);
        }
    }
    const mouseOnOperations = () => {
        if (!loading) {
            setShowInfo(true);
        }
    }
    

    const handleJoinTopic = async () => {
        setLoading(true); 
        setOnPopup(true);
        try {
            await socket.emit('join-pairing', {
                userID: authUser,
                topicName: name
            });

            socket.on('session created', (data) => {
                setInitialRoomID(data.roomID);
            });

            socket.on('session complete', async (data) => {
                const roomID = data.roomID;
                const otherUserID = data.usersID.find(id => id !== authUser);
                setOtherUserID(otherUserID);
                await socket.emit('add-to-userslists', {
                    userID: authUser,
                    otherUserID: otherUserID
                });
                await socket.emit('add-to-roomlist', {
                    userID: authUser,
                    otherUserID: otherUserID,
                    roomID: roomID
                });
                await socket.emit("cancel-join", roomID); // Delete joining session
                navigate(`/chat/${roomID}?topic=${encodeURIComponent(name)}`);
            });

            socket.on('session-deleted', (data) => {
            });
        } catch (error) {
            console.error("Error during join-pairing:", error);
        } finally {
            setLoading(false); 
        }
    };

    const handleCancel = () => {
        setOnPopup(false);
        setShowInfo(false)
        socket.emit('cancel-join', initialRoomID);
    }

    return (
        <div className={`relative max-w-[240px] max-h-[135px] `}
            onMouseOver={() => mouseOnOperations()}
            onMouseLeave={() => mouseLeaveOperations()}
        >
            <img className="drop-shadow rounded-md" src={imageUrl} alt={name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div className={`shadow bg-emerald-400 border-1 border-emerald-600
                rounded-sm absolute left-0 right-0 bottom-0 px-3 pb-3 pt-1
                transition-opacity opacity-0
                duration-300 ${showInfo ? 'translate-y-full opacity-100 z-50' : 'translate-y-full'}`} >
                <h3 className='text-xl font-bold'>{name}</h3>
                <p className='text-sm'>{description}</p>
                <button
                    className="py-2 px-4 mb-2 rounded-lg" onClick={() => handleJoinTopic()}
                    style={{ backgroundColor: "#B4BD9F" }}>Join</button>
                <Popup open={onPopup} closeOnDocumentClick={false} closeOnEscape={false}
                    position="right center" modal>
                    {close => <div className="popup" style={{ backgroundColor: "#B9D8B6", padding: "20px", borderRadius: "10px", textAlign: "center" }}>
                        <h2 className='font-bold text-xl mb-2 text-dark-grey'>Waiting to be paired with another user...</h2>
                        <button className="transition-opacity hover:opacity-70 border-neutral-400 border py-2 px-4 rounded-lg close text-dark-grey" 
                        onClick={() => handleCancel()}
                        style={{ backgroundColor: "#E1EACC" }}
                        >Cancel</button>
                    </div>}
                </Popup>
            </div>
        </div>
    );
};

export default TopicItem;
