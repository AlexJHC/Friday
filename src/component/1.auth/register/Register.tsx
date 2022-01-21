import {FormEvent, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from '../../../store/store'
import {Navigate} from 'react-router-dom'
import {signUp} from './registerReducer'
import style from './Register.module.css'
import InputText from '../../3.features/InputText/InputText'
import Button from '../../3.features/Button/Button'

const Register = () => {

  const dispatch = useDispatch()

  const isRegisterSuccess = useSelector<AppRootStateType, boolean>(state => state.register.isRegisterSuccess)

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirm, setConfirm] = useState<string>('')

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = {
      email: email,
      password: password,
      confirm: confirm,
    }

    dispatch(signUp(formData))
  }

  if (isRegisterSuccess) {
    return <Navigate to="/"/>
  }

  return (
    <div className={style.container}>
      <h2>Sign up</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>
            Email <br/>
            <InputText placeholder="example@inbox.com"
                       value={email}
                       onChangeText={setEmail}/>
          </label>
        </div>
        <div>
          <label>
            Password <br/>
            <InputText placeholder="********"
                       value={password}
                       password
                       onChangeText={setPassword}/>
          </label>
        </div>
        <div>
          <label>
            Confirm password <br/>
            <InputText placeholder="********"
                       value={confirm}
                       password
                       onChangeText={setConfirm}/>
          </label>
        </div>
        <div>
          <Button type="submit">Sign Up</Button>
        </div>
      </form>
    </div>
  )
}

export default Register