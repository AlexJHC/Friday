import {Navigate, Route, Routes} from "react-router-dom";
import TestPage from "../1.auth/TestPage";
import Login from "../1.auth/login/Login";
import Password from "../1.auth/password/Password";
import PasswordRestore from "../1.auth/password/passwordRestore/PasswordRestore";
import CheckEmail from "../1.auth/password/checkEmail/CheckEmail";
import NewPassword from "../1.auth/password/newPassword/NewPassword";
import Profile from "../2.profile/Profile";
import Register from "../1.auth/register/Register";
import Page404 from "../Page404/Page404";
import React from "react";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<TestPage/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/password' element={<Password/>}/>
            <Route path='/password-restore' element={<PasswordRestore/>}/>
            <Route path='/password-on-email' element={<CheckEmail/>}/>
            <Route path='/create-new-password/:token' element={<NewPassword/>}/>
            <Route path='/create-new-password' element={<NewPassword/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/registration' element={<Register/>}/>
            <Route path='/404' element={<Page404/>}/>
            <Route path={'*'} element={<Navigate to={'/Page404'}/>}/>
        </Routes>
    )
}

export default AppRoutes