import { useSelector } from 'react-redux'
import style from '../Password.module.css'
import {AppRootStateType} from "../../../../store/store";

const CheckEmail = () => {

  const restoreEmail = useSelector<AppRootStateType, string>(state => state.password.restoreEmail)

  return (
    <div className={style.container}>
      <div>
        <span>icon with letter</span>
      </div>
      <h3>Check Email</h3>
      <p style={{width: '300px', textAlign: 'center'}}>We’ve sent an Email with instructions to {restoreEmail}</p>
    </div>
  )
}

export default CheckEmail
