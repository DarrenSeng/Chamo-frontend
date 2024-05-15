import axios from 'axios'

const api_url = 'https://chamo-app.adaptable.app/' 

export const testFunction = async() => {
    return await axios.get(`${api_url}/api/auth/testroute`)
}

export const loginUser = async (email, password) => {
    return await axios.post(`${api_url}/api/auth`, { email, password }, { withCredentials: true });
};

export const sendPasswordResetLink = async (email) => {
    return await axios.post(`${api_url}/api/password-reset`, { email });
};

export const verifyPasswordResetLink = async (userId, token) => {
    return await axios.get(`${api_url}/api/password-reset/${userId}/${token}`);
};

export const resetPassword = async (userId, token, password) => {
    return await axios.post(`${api_url}/api/password-reset/${userId}/${token}`, { password });
};

export const getUserDetails = async (userId) => {
    const response = await axios.get(`${api_url}/api/users/${userId}`);
    //console.log("response",response.data)
    return response
};

export const updateUserProfile = async (userId, profileData) => {
    return await axios.put(`${api_url}/api/users/${userId}/profile`, profileData);
};
  
  export const getCountries = async () => {
    return await axios.get('https://restcountries.com/v3.1/all');
};

export const registerUser = async (userData) => {
    try {
      const response = await axios.post(`${api_url}/api/users`, userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || 'Registration failed');
    } 
};

export const authenticateUser = async() => {
    try {
        return await axios.get(`${api_url}/api/auth`);
    } catch (error) {
        throw new Error( 'Authentication failed');
    }
}

export const getChatSession = async (roomID) => {
    try {
      const response = await axios.get(`${api_url}/api/msg/get-chatsession/${roomID}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching chat session:', error);
      throw new Error('Failed to fetch chat session');
    }
};

  export const getFriendStatus = async (passedOtherID, authUser) => {
    try {
      const response = await axios.get(`${api_url}/api/reveal/check_frq_status/${passedOtherID}/${authUser}`);
      return response; 
    } catch (error) {
      console.error('Error fetching friend status:', error);
      throw new Error('Failed to fetch friend status');
    }
};

export const getBlockStatus = async (otherUserID, authUser) => {
    try {
        const response = await axios.get(`${api_url}/api/users/check_block_status/${otherUserID}/${authUser}`);
        return response;
    } catch (error) {
        console.error('Error fetching block status:', error);
        throw new Error('Error fetching block status');
    }
};

export const loadingMessages = async (requestData) => {
    try {
        const response = await axios.post(`${api_url}/api/msg/loading-messages`, requestData);
        return response.data;
    } catch (error) {
        throw new Error('Error loading messages:', error);
    }
};

export const blockUser = async (otherUID, requestBody) => {
    try {
        const response = await axios.post(`${api_url}/api/users/block_user/${otherUID}`, requestBody);
        return response.data.success;
    } catch (error) {
        throw new Error('Error blocking user:', error);
    }
};

export const unblockUser = async (otherUID, requestBody) => {
    try {
        const response = await axios.post(`${api_url}/api/users/unblock_user/${otherUID}`, requestBody);
        return response.data.success;
    } catch (error) {
        throw new Error('Error unblocking user:', error);
    }
};

export const addFriend = async (currentRoomID, otherUID, authUser) => {
    try {
        const response = await axios.post(`${api_url}/api/reveal/create_frq/${currentRoomID}/${otherUID}`, { currentUserID: authUser });
        return response.data;
    } catch (error) {
        throw new Error('Error adding friend:', error);
    }
};

export const cancelFriendRequest = async (currentRoomID, otherUID, authUser) => {
    try {
        const response = await axios.delete(`${api_url}/api/reveal/delete_frq/${currentRoomID}/${otherUID}/${authUser}`);
        return response.data;
    } catch (error) {
        throw new Error('Error canceling friend request:', error);
    }
};

export const rejectFriendRequest = async (currentRoomID, otherUID, authUser) => {
    try {
        const response = await axios.delete(`${api_url}/api/reveal/reject_frq/${currentRoomID}/${otherUID}/${authUser}`);
        return response.data;
    } catch (error) {
        throw new Error('Error rejecting friend request:', error);
    }
};

export const acceptFriendRequest = async (currentRoomID, otherUID, authUser) => {
    try {
        const response = await axios.post(`${api_url}/api/reveal/accept_frq/${currentRoomID}/${otherUID}/${authUser}`);
        return response.data;
    } catch (error) {
        throw new Error('Error accepting friend request:', error);
    }
};

export const removeFriend = async (currentRoomID, otherUID, authUser) => {
    try {
        const response = await axios.delete(`${api_url}/api/reveal/remove_friend/${currentRoomID}/${otherUID}/${authUser}`);
        return response.data;
    } catch (error) {
        throw new Error('Error removing friend:', error);
    }
};

export const submitReportRequest = async (username, userID, request) => {
    try {
        const response = await axios.post(`${api_url}/api/help`, {
            username,
            userID,
            request,
        });
        return response.data;
    } catch (error) {
        throw new Error('Error sending request:', error);
    }
};

export const fetchAllTopics = async () => {
    try {
        const response = await axios.get(`${api_url}/api/topic/render_topics`);
        console.log("fetch",response.data)
        return response.data;
    } catch (error) {
        throw new Error('Error fetching topics:', error);
    }
};

export const createNewTopic = async (authUser, topicTitle, topicDescription, selectedImage) => {
    try {
        const formData = new FormData();
        formData.append('topicCreator', authUser);
        formData.append('topicTitle', topicTitle);
        formData.append('topicDescription', topicDescription);
        formData.append('subscriber', []);

        if (selectedImage) {
            formData.append('topicImage', selectedImage);
        }

        const response = await axios.post(`${api_url}/api/topic/create_topic`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return response.data.message;
    } catch (error) {
        throw new Error('Error creating topic:', error);
    }
};

export const fetchUserNotifications = async (userID) => {
    try {
        const response = await axios.post(`${api_url}/api/notifications/get_notifications`, {
            userID: userID
        });
        return response.data.requestList;
    } catch (error) {
        throw new Error('Error fetching notifications:', error);
    }
};

export const addNewUser = async (otherUserID, currentUserID) => {
    try {
        await axios.post(`${api_url}/api/users/add_user/${otherUserID}`, {
            currentUserID: currentUserID
        });
    } catch (error) {
        throw new Error('Error adding new user:', error);
    }
};

export const searchForTopicOrUser = async (input) => {
    try {
        const response = await axios.post(`${api_url}/api/users/results`, {
            input: input
        });

        if (response.data.usersFound) {
            return response.data.users;
        } else {
            return [];
        }
    } catch (error) {
        throw new Error('Error searching for topic or user:', error);
    }
};

export const sendRequestToUserPost = async (otherUserID, currentUserID) => {
    try {
        await axios.post(`${api_url}/api/users/send_req/${otherUserID}`, {
            currentUserID: currentUserID
        });
    } catch (error) {
        throw new Error('Error sending request to user:', error);
    }
};