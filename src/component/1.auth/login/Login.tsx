import style from './Login.module.css'
import InputText from "../../3.features/InputText/InputText";
import {Link} from "react-router-dom";
import React, {useState} from "react";
import Button from "../../3.features/Button/Button";
import {useDispatch} from "react-redux";
import {LogIn} from "./loginReducer";

const Login = () => {

    const dispatch = useDispatch()

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    // maybe global error or local ?
    // global error - server not response
    const [emailError, setEmailError] = useState<string>('')


    const EmailRegExp = () =>
        email.trim().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)

    // need global pass & pass verify

    const loginHandler = () => {
        if (EmailRegExp() && password) {
            const data = {
                email,
                password,
                rememberMe: false
            }
            dispatch(LogIn(data))
            setEmail('')
            setPassword('')
        } else {
            setEmailError('please enter valid email or password')
        }
    }


    return (
        <div className={style.container}>
            <h1>Sign In</h1>
            <label htmlFor={'Email'}>Email</label>
            <InputText
                onChangeText={setEmail}
                name={'Email'}
                error={emailError}
            />
            <br/>
            <label htmlFor={'Password'}>Password</label>
            <InputText
                onChangeText={setPassword}
                name={'Password'}
            />
            <Link to={'/password-restore'}>Forgot Password</Link>
            {/*Need global disable status*/}
            <Button onClick={loginHandler}>Login</Button>

            <span>Don't have an account</span>
            <Link to={'/registration'}>Sign Up</Link>

        </div>
    )
}

export default Login



