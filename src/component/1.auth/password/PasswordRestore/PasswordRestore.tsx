import React, {useState} from "react";
import {Link, Navigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {restoreThroughEmail} from "../password-restore-reducer";
import style from "../Password.module.css";
import InputText from "../../../3.features/InputText/InputText";
import Button from "../../../3.features/Button/Button";
import {AppRootStateType} from "../../../../store/store";

const PasswordRestore = () => {
  const dispatch = useDispatch()
  const sendingEmailSuccess = useSelector<AppRootStateType, boolean>(state => state.password.sendingEmailSuccess)

  const [email, setEmail] = useState<string>('')

  const handleEmailSubmit = () => {
    dispatch(restoreThroughEmail(email))
  }

  if (sendingEmailSuccess) return <Navigate to={'/password-on-email'}/>

  return (
    <div className={style.container}>
      <h3>Forgot your password?</h3>
      <label htmlFor={'Email'}>Email</label>
      <InputText
        onChangeText={setEmail}
        value={email}
        name={'Email'}
        id={'Email'}
        placeholder="example@inbox.com"
      />
      <p style={{width: '300px', textAlign: 'center'}}>Enter your email address and we will send you further instructions</p>
      <Button onClick={handleEmailSubmit}>Create new password</Button>
      <p>Did you remember your password?</p>
      <Link to={'/login'}>Try logging in</Link>
    </div>
  )
}

export default PasswordRestore
