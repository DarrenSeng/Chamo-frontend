import React from 'react'
import { useEffect, useState, useContext } from 'react'
import "../../css/style.css"
import { AuthContext } from '../../context/AuthProvider';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { getUserDetails } from '../../api/api';
import Chat from './Chat';
import cookies from 'js-cookie'

const RenderChat = () => {
    const [ authUser, setAuthUser ] = useState(cookies.get('user'));
        console.log("authuser",authUser)
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
                    const response = await getUserDetails(authUser);
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




        return ( <
            div className = "flex flex-col h-screen" > {
                user && < Chat user = { user } passedRoomID={passedRoomID} topicName={topicName}
                />} <
                /div>
            );
        };

        export default RenderChat