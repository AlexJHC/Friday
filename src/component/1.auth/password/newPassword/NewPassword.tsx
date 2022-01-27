import React, {useState} from "react";
import {Navigate, useParams} from "react-router-dom";
import style from "../Password.module.css";
import InputText from "../../../3.features/InputText/InputText";
import Button from "../../../3.features/Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../../store/store";
import {createNewPassword} from '../../../../store/auth-reducers/password-restore-reducer'

const NewPassword = () => {
  const dispatch = useDispatch()
  const changingPasswordSuccess = useSelector<AppRootStateType, boolean>(state => state.password.isPasswordChanged)

  const params = useParams()
  console.log(params.token)

  const [password, setPassword] = useState<string>('')

  const handlePasswordSubmit = () => {
    dispatch(createNewPassword(password, params.token))
  }

  if (changingPasswordSuccess) return <Navigate to={'/'}/>

  return (
    <div className={style.container}>
      <h3>Create new password</h3>
      <label htmlFor={'Password'}/>
      <InputText
        onChangeText={setPassword}
        value={password}
        name={'Password'}
        id={'Password'}
        placeholder={'password...'}
        password={true}
      />
      <p style={{width: '300px', textAlign: 'center'}}>Create new password and we will send you further instructions to email</p>
      <Button onClick={handlePasswordSubmit}>Create new password</Button>
    </div>
  )
}

export default NewPassword
