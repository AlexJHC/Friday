import Button from '../3.features/Button/Button'
import {useSelector} from 'react-redux'
import {AppRootStateType} from '../../store/store'
import {Navigate} from 'react-router-dom'
import {authAPI} from '../../api/api'

const Profile = () => {

  const isAuth = useSelector<AppRootStateType, boolean>(state => state.app.isAuth)
  const name = useSelector<AppRootStateType, string>(state => state.profile.user.name)
  const avatar = useSelector<AppRootStateType, string | undefined>(state => state.profile.user.avatar)

  if (!isAuth) {
    return <Navigate to="/login"/>
  }

  const handleClick = () => {
    authAPI.logOut()
      .then(res => {
        console.log(res.data.info)
      })
      .catch(e => {
        console.log(e.response.data.error)
      })
  }

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
