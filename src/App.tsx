import React from 'react';
import './App.css';
import {Navigate, Route, Routes} from 'react-router-dom';
import Page404 from "./component/404/Page404";
import TestPage from "./component/auth/TestPage";
import Login from "./component/auth/Login";
import Password from "./component/auth/Password";
import PasswordRestore from "./component/auth/PasswordRestore";
import Profile from "./component/auth/Profile";
import Registration from "./component/auth/Registration";

function App() {
    return (
        <>
            <Routes>
                <Route path='/' element={<TestPage/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/password' element={<Password/>}/>
                <Route path='/password-restore' element={<PasswordRestore/>}/>
                <Route path='/profile' element={<Profile/>}/>
                <Route path='/registration' element={<Registration/>}/>
                <Route path='/404' element={<Page404/>}/>
                <Route path={'*'} element={<Navigate to={'/404'}/>}/>
            </Routes>
        </>
    )
}

export default App;
