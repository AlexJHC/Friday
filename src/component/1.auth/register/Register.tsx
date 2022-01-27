import {FormEvent, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from '../../../store/store'
import {Navigate} from 'react-router-dom'

import style from './Register.module.css'
import InputText from '../../3.features/InputText/InputText'
import Button from '../../3.features/Button/Button'
import { signUp } from '../../../store/authReducer'

const Register = () => {

  const dispatch = useDispatch()

  const isRegisterSuccess = useSelector<AppRootStateType, boolean>(state => state.auth.isRegisterSuccess)

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirm, setConfirm] = useState<string>('')

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(signUp({email,password,confirm}))
  }

  if (isRegisterSuccess) return <Navigate to="/"/>

  return (
    <div className={style.container}>
      <h2>Sign up</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>
            Email <br/>
            <InputText
              placeholder="example@inbox.com"
              value={email}
              onChangeText={setEmail}/>
          </label>
        </div>
        <div>
          <label>
            Password <br/>
            <InputText
              placeholder="********"
              value={password}
              password
              onChangeText={setPassword}/>
          </label>
        </div>
        <div>
          <label>
            Confirm password <br/>
            <InputText
              placeholder="********"
              value={confirm}
              password
              onChangeText={setConfirm}/>
          </label>
        </div>
        <div>
          <Button
            padding={'63px'}
            type="submit">
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Register
