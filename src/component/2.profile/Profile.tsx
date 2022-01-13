import Button from '../3.features/Button/Button'
import {useEffect} from 'react'
import {authAPI} from '../../api/api'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from '../../store/store'
import {setUser} from './profileReducer'

const Profile = () => {

  const dispatch = useDispatch()

  const name = useSelector<AppRootStateType, string>(state => state.profile.user.name)
  const avatar = useSelector<AppRootStateType, string | undefined>(state => state.profile.user.avatar)

  useEffect(() => {
    authAPI.authMe()
      .then(res => {

        dispatch(setUser(res.data))
      })
  }, [dispatch])

  return (
    <div>
      <div>
        <img src={avatar} alt="avatar"/>
      </div>
      <div>
        name: <span>{name}</span>
      </div>
      <Button>Log Out</Button>
    </div>
  )
}

export default Profile
