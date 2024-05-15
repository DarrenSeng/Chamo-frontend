import React from 'react';
import { useState, useEffect } from 'react';
import {Helmet} from 'react-helmet'
import "./css/style.css"
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import { Login } from './view/Login';
import ProtectedRoutes from './ProtectedRoutes';
import Axios from 'axios'
import { AuthContext } from './context/AuthProvider.js';
import UserPersistance from './common/UserPersistance';
import ProfileMenu from './common/ProfileMenu';
import { PasswordReset } from './common/PasswordReset';
import { Registration } from './view/Registration.jsx';
import { PrivacyPolicy } from './common/PrivacyPolicy.jsx';
import Settings from './view/settingsview/Settings.jsx';
import Explore from './view/Explore.jsx';
import RenderChat from './view/chatview/RenderChat.js';
import cookies from 'js-cookie'

function App() {
  const [ authUser, setAuthUser ] = useState(cookies.get('user'));
  Axios.defaults.withCredentials = true


  return (
    <Router>
      <Helmet>
        <style>{`body{background-color:#313131;}`}</style>
      </Helmet>
      <AuthContext.Provider value={{authUser:authUser, setAuthUser:setAuthUser}} >
        <Routes>
        <Route path="/password-reset/:userId/:token"  element= {<PasswordReset/>} />
        <Route path="/sign-up" element={<Registration/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/privacy" element={<PrivacyPolicy/>} />
          <Route element = {<UserPersistance/>} />
            <Route element = {<UserPersistance/>}>
            <Route element = {<ProtectedRoutes/>}>
              <Route path="/profile" element={<ProfileMenu/>} />
            </Route>
          </Route>
          <Route element = {<UserPersistance/>}>
            <Route element = {<ProtectedRoutes/>}>
            <Route path="/" element={<Explore/>} />
            <Route path="/chat" element={<RenderChat />} />
              <Route path="/chat/:passedRoomID" element={<RenderChat/>} />
              <Route path="/settings" element={<Settings/>} />
              <Route path="/explore" element={<Explore/>} />
            </Route>
          </Route>
          <Route path='*' element={<UserPersistance />} />
        </Routes>
    </AuthContext.Provider>
  </Router>
  )
}
export default App;