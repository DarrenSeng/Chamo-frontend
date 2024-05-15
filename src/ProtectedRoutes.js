import React from "react";
import {Outlet, Navigate, useLocation} from 'react-router-dom';
import cookies from 'js-cookie'

const ProtectedRoutes = () => {
    const location = useLocation()
    const session = cookies.get('browsingSession')

    return(
        <>
            {(session !== undefined) ? <Outlet/> : <Navigate to='/login' state={{from:location}} replace/>}
        </>
    )
}

export default ProtectedRoutes
