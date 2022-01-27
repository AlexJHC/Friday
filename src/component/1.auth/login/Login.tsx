import style from './Login.module.css'
import InputText from '../../3.features/InputText/InputText'
import {Link, Navigate} from 'react-router-dom'
import React, {FormEvent, useState} from 'react'
import Button from '../../3.features/Button/Button'
import {useDispatch, useSelector} from 'react-redux'
import {logIn, setError} from '../../../store/appReducer'
import Checkbox from '../../3.features/CheckBox/CheckBox'
import {AppRootStateType} from '../../../store/store'
import {emailRegExp, passwordLength} from "../../3.features/Helpers/Helpers";


const Login = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector<AppRootStateType, boolean>(state => state.app.isAuth)

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [rememberMe, setRememberMe] = useState<boolean>(false)

  const rememberMeHandler = () => {
    setRememberMe(!rememberMe)
  }

  const LoginSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (emailRegExp(email) && passwordLength(password)) {
      dispatch(logIn({email, password, rememberMe}))
      setEmail('')
      setPassword('')
    } else {
      dispatch(setError('Please enter valid email or password'))
    }
  }

  if (isAuth) return <Navigate to="/profile"/>

  return (
    <div className={style.container}>
      <h1>Sign In</h1>
      <form
        onSubmit={LoginSubmitHandler}
        className={style.formContainer}
      >
        <label>Email
          <InputText
            value={email}
            placeholder="example@inbox.com"
            onChangeText={setEmail}
          />
        </label>
        <br/>
        <label>Password
          <InputText
            value={password}
            placeholder="********"
            onChangeText={setPassword}
            password
          />
        </label>
        <Link to={'/password-restore'}>Forgot Password</Link>
        <Checkbox onClick={rememberMeHandler}>Remember me</Checkbox>
        <Button padding={'112px'} type={'submit'}>Login</Button>
      </form>
      <span>Don't have an account</span>
      <Link to={'/registration'}>Sign Up</Link>
    </div>
  )
}

export default Login



