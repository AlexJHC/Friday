import Button from '../3.features/Button/Button'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from '../../store/store'
import {Navigate} from 'react-router-dom'
import {logOut} from '../../store/appReducer'

const Profile = () => {

  const dispatch = useDispatch()

  const isAuth = useSelector<AppRootStateType, boolean>(state => state.app.isAuth)
  const name = useSelector<AppRootStateType, string>(state => state.profile.user.name)
  const avatar = useSelector<AppRootStateType, string | undefined>(state => state.profile.user.avatar)

  const handleClick = () => {
    dispatch(logOut())
  }

  if (!isAuth) return <Navigate to='/'/>

  return (
    <div>
      <div>
        <img src={avatar} alt="avatar"/>
      </div>
      <div>
        name: <span>{name}</span>
      </div>
      <Button onClick={handleClick}>Log Out</Button>
    </div>
  )
}

export default Profile
