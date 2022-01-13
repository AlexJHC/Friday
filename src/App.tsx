import React from 'react';
import './App.css';
import {Link} from 'react-router-dom';
import AppRoutes from "./component/4.routes/AppRoutes";


function App() {
  return (
    <>
      <nav style={{display: "flex", gap: '20px', justifyContent: "center"}}>
        <Link to={'/'}>Home</Link>
        <Link to={'/login'}>login</Link>
        <Link to={'/password'}>password</Link>
        <Link to={'/password-restore'}>password restore</Link>
        <Link to={'/profile'}>profile</Link>
        <Link to={'/registration'}>registration</Link>
      </nav>
      <hr/>
      <AppRoutes/>
    </>
  )
}

export default App;
