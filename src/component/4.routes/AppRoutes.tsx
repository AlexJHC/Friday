import {Navigate, Route, Routes} from 'react-router-dom'
import TestPage from '../1.auth/TestPage'
import Login from '../1.auth/login/Login'
import PasswordRestore from '../1.auth/password/passwordRestore/PasswordRestore'
import CheckEmail from '../1.auth/password/checkEmail/CheckEmail'
import NewPassword from '../1.auth/password/newPassword/NewPassword'
import Profile from '../2.profile/Profile'
import Register from '../1.auth/register/Register'
import Page404 from '../Page404/Page404'
import React from 'react'
import {Packs} from '../5.packs/Packs'
import Cards from '../6.cards/Cards'
import ProfileEdit from "../2.profile/profileEdit/ProfileEdit";
import {Learn} from "../7.learn/Learn";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/test" element={<TestPage/>}/>
      <Route path="/" element={<Login/>}/>
      <Route path="/password-restore" element={<PasswordRestore/>}/>
      <Route path="/password-on-email" element={<CheckEmail/>}/>
      <Route path="/create-new-password/:token" element={<NewPassword/>}/>
      <Route path="/create-new-password" element={<NewPassword/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/profile-edit" element={<ProfileEdit/>}/>
      <Route path="/registration" element={<Register/>}/>
      <Route path="/packs" element={<Packs/>}/>
      <Route path="/cards/:cardsPack_id" element={<Cards/>}/>
      <Route path="/learn/:cardsPack_id/:name" element={<Learn/>}/>
      <Route path="/404" element={<Page404/>}/>
      <Route path={'*'} element={<Navigate to={'/404'}/>}/>
    </Routes>
  )
}

export default AppRoutes
