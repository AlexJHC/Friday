import Button from '../3.features/Button/Button'

const Profile = () => {
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