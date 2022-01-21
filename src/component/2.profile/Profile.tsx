import Button from '../3.features/Button/Button'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from '../../store/store'
import {Link, Navigate} from 'react-router-dom'
import {logOut} from '../../store/appReducer'
import BoratAvatar from '../Img/Borat-Avatar.png'
import style from './Profile.module.css'

const Profile = () => {

  const dispatch = useDispatch()

  const isAuth = useSelector<AppRootStateType, boolean>(state => state.app.isAuth)
  const name = useSelector<AppRootStateType, string>(state => state.profile.user.name)
  const avatar = useSelector<AppRootStateType, string | undefined>(state => state.profile.user.avatar)
  const cardsCount = useSelector<AppRootStateType, number>(state => state.profile.user.publicCardPacksCount)

  const handleClick = () => {
    dispatch(logOut())
  }

  if (!isAuth) return <Navigate to='/'/>

  return (
    <div className={style.profileWrapper}>
      <div>
        <img src={avatar ?? BoratAvatar} alt="avatar" width='96px'/>
      </div>
      <span>{name}</span>
      <Link className={style.link} to={'/profile-edit'}>Edit profile</Link>
      <Button onClick={handleClick}>Log Out</Button>
        <div>Number of Packs</div>
        <div>{cardsCount}</div>
    </div>
  )
}

export default Profile
