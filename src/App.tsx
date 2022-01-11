import React from 'react';
import './App.css';
import {Link, Navigate, Route, Routes} from 'react-router-dom';
import Page404 from "./component/Page404/Page404";
import TestPage from "./component/1.auth/TestPage";
import Login from "./component/1.auth/login/Login";
import Password from "./component/1.auth/password/Password";
import PasswordRestore from "./component/1.auth/password/PasswordRestore";
import Profile from "./component/2.profile/Profile";
import Registration from "./component/1.auth/Registration/Registration";

function App() {
    return (
        <>
            <nav style={{display: "flex", gap: '20px', justifyContent: "center"}}>
                <Link to={'/'}>Home</Link>
                <Link to={'/login'}>login</Link>
                <Link to={'/password'}>password</Link>
                <Link to={'/password-restore'}>password restore</Link>
                {/*<Link to={'/2.profile'}>profile</Link>*/}
                <Link to={'/profile'}>profile</Link>
                <Link to={'/registration'}>registration</Link>
            </nav>
            <hr/>
            <Routes>
                <Route path='/' element={<TestPage/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/password' element={<Password/>}/>
                <Route path='/password-restore' element={<PasswordRestore/>}/>
                <Route path='/profile' element={<Profile/>}/>
                <Route path='/registration' element={<Registration/>}/>
                <Route path='/404' element={<Page404/>}/>
                <Route path={'*'} element={<Navigate to={'/Page404'}/>}/>
            </Routes>
        </>
    )
}

export default App;
