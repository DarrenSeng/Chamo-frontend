import React from 'react'
import Axios from 'axios'
import { Outlet, Navigate} from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import cookies from 'js-cookie'
import { AuthContext } from '../context/AuthProvider'
import { authenticateUser } from '../api/api'


const UserPersistance = () => {
    //const session = cookies.get('browsingSession')
    const session = cookies.get("user")
    console.log("session",session)
  const [ authUser, setAuthUser ] = useState(cookies.get('user'));
    const isLoginUserURI = "https://chamo-app.adaptable.app/"
    useEffect(() => {
        async function fetchUserId() {
            
            const response = await authenticateUser();
            console.log("user persistence", response)
            const userID = response.data.userId ?? null
            const sid = response.data.sid ?? null
            const isLoggedIn = response.data.isLoggedIn ?? null
            setAuthUser(userID) 
            
        }
        fetchUserId()
    }, [])

    return (
        <>
            {(session !== undefined)  ? <Outlet/> : <Navigate to='/login' replace={true}/>}
        </>
        
    )
}

export default UserPersistance
