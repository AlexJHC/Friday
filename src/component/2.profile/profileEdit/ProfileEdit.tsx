import {useDispatch, useSelector} from 'react-redux'
import {Navigate} from 'react-router-dom'
import {AppRootStateType} from "../../../store/store";
import BoratAvatar from "../../Img/Borat-Avatar.png";
import style from './ProfileEdit.module.css'
import InputText from "../../3.features/InputText/InputText";
import React, {FormEvent, useEffect, useState} from "react";
import Button from '../../3.features/Button/Button';
import {setError} from "../../../store/appReducer";
import {renameNick} from "../profileReducer";

const ProfileEdit = () => {

  const dispatch = useDispatch()

  const isAuth = useSelector<AppRootStateType, boolean>(state => state.app.isAuth)
  const UserName = useSelector<AppRootStateType, string>(state => state.profile.user.name)
  const email = useSelector<AppRootStateType, string>(state => state.profile.user.email)
  const avatar = useSelector<AppRootStateType, string | undefined>(state => state.profile.user.avatar)

  const [Nickname, setNickname] = useState<string>('')

  const handleNicknameChanger = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (Nickname.length > 1) {
      dispatch(renameNick({name: Nickname, avatar: ''}))
      setNickname('')
    } else {
      dispatch(setError('Please enter valid Nickname'))
      setNickname('')
    }
  }

  if (!isAuth) return <Navigate to='/'/>

  return (
    <div className={style.profileEditWrapper}>
      <h1>Personal information</h1>
      <div>
        <img src={avatar ?? BoratAvatar} alt="avatar" width='96px'/>
      </div>
      <form onSubmit={handleNicknameChanger}>
        <label>Nickname
          <InputText
            placeholder={UserName}
            value={Nickname}
            onChangeText={setNickname}/>
        </label>
        <br/>
        <label>Email
          <InputText
            value={email}/>
        </label>
        <div>
          <Button type={'submit'}>Save</Button>
        </div>
      </form>
    </div>
  )
}

export default ProfileEdit
