import style from './Login.module.css'
import InputText from "../../3.features/InputText/InputText";
import {Link} from "react-router-dom";
import React from "react";
import Button from "../../3.features/Button/Button";

const Login = () => {
    return (
        <div className={style.container}>
            <h1>Sign In</h1>
            <InputText/>
            <br/>
            <InputText/>
            <Link to={'/password-restore'}>Forgot Password</Link>
            <Button>Login</Button>
            <span>Don't have an account</span>
            <Link to={'/registration'}>Sign Up</Link>

        </div>
    )
}

export default Login