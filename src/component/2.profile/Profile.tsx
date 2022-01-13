import Button from '../3.features/Button/Button'
import {useEffect} from 'react'
import {authAPI} from '../../api/api'

const Profile = () => {

  useEffect(() => {
    authAPI.authMe()
      .then(res => {
        console.log(res.data)
      })
  }, [])

  return (
    <div>
      <div>
        <img src="https://placeimg.com/50/50/people" alt="avatar"/>
      </div>
      <div>
        name: <span>John Wick</span>
      </div>
      <Button>Log Out</Button>
    </div>
  )
}

export default Profile
