import React from 'react'
import { useEffect, useState, useContext } from 'react'
import "../../css/style.css"
import { AuthContext } from '../../context/AuthProvider';
import { useParams } from 'react-router-dom';
import axios from "axios";
import Chat from './Chat';

const RenderChat = () => {
        const { authUser, setAuthUser } = useContext(AuthContext)
        const [user, setUserDetails] = useState(null);
        const [firstName, setFirstName] = useState("");
        const [username, setUsername] = useState("");
        const [friendUsername, setFriendUsername] = useState()
        const {passedRoomID}= useParams()
        const queryParams = new URLSearchParams(window.location.search);
    const topicName = queryParams.get('topic');

        useEffect(() => {
            const fetchUserDetails = async() => {
                try {
                    const response = await axios.get(`http://localhost:3001/api/users/${authUser}`);
                    setAuthUser(response.data._id)
                    setUserDetails(response.data);
                    setUsername(response.data.username)
                    setFirstName(response.data.firstName)
                } catch (error) {
                    console.error("Error fetching user details:", error);
                }
            }
            if (authUser) {
                fetchUserDetails();
            }
        }, [authUser])


        const handleAddFriendsInputChange = (event) => {
            setFriendUsername(event.target.value)
        }

        const addFriendEvent = async() => {
            try {
                const response = await axios.post(`http://localhost:3001/api/users/add_user/${friendUsername}`, {
                    userID: user._id
                })
                console.log(response)
            } catch (error) {
                console.log(error)
            }
        }

        return ( <
            div className = "flex flex-col h-screen" > {
                user && < Chat user = { user } passedRoomID={passedRoomID} topicName={topicName}
                />} <
                /div>
            );
        };

        export default RenderChat