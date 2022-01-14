import style from './Login.module.css'
import InputText from '../../3.features/InputText/InputText'
import {Link, Navigate} from 'react-router-dom'
import React, {useState} from 'react'
import Button from '../../3.features/Button/Button'
import {useDispatch, useSelector} from 'react-redux'
import {LogInStatus, setError} from '../../../store/appReducer'
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

  const loginHandler = () => {
    if (emailRegExp(password) && passwordLength) {
      // action variable
      const data = {
        email,
        password,
        rememberMe
      }
      dispatch(LogInStatus(data))
      setEmail('')
      setPassword('')
    } else {
      dispatch(setError('Please enter valid email or password'))
    }
  }

  if (isAuth) {
    return <Navigate to="/profile"/>
  }

  return (
    <div className={style.container}>
      <h1>Sign In</h1>
      <label htmlFor={'Email'}>Email</label>
      <InputText
        onChangeText={setEmail}
        name={'Email'}
        id={'Email'}
      />
      <br/>
      <label htmlFor={'Password'}>Password</label>
      <InputText
        onChangeText={setPassword}
        name={'Password'}
        id={'Password'}
        password
      />
      <Link to={'/password-restore'}>Forgot Password</Link>
      <Checkbox onClick={rememberMeHandler}>Remember me</Checkbox>
      <br/>
      <Button onClick={loginHandler}>Login</Button>
      <span>Don't have an account</span>
      <Link to={'/registration'}>Sign Up</Link>

    </div>
  )
}

export default Login



