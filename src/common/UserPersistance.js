import React from 'react'
import Axios from 'axios'
import { Outlet, Navigate} from 'react-router-dom'
import { useEffect, useContext } from 'react'
import cookies from 'js-cookie'
import { AuthContext } from '../context/AuthProvider'


const UserPersistance = () => {
    const session = cookies.get('browsingSession')
    const { authUser, setAuthUser } = useContext(AuthContext)
    const isLoginUserURI = "http://localhost:3001/api/auth"
    useEffect(() => {
        async function fetchUserId() {
            const response = await Axios.get(isLoginUserURI)
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
