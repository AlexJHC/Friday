import React, {ChangeEvent, FormEvent, useState} from "react";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {passwordRecovery} from "../password-restore-reducer";

const PasswordRestore = () => {
  const dispatch = useDispatch()

  const [email, setEmail] = useState<string>('')

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.currentTarget.value)
  }

  const onsubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(passwordRecovery(email))
  }

  return (
    <>
      <h3>Forgot your password?</h3>
      <form onSubmit={onsubmit}>
        <div>
          <label>
            Email<br/>
            <input onChange={handleEmailChange}
                   type="text"
                   placeholder="example@inbox.com"
                   name="email"
                   value={email}/>
          </label>
        </div>
        <p>Enter your email address and we will send you further instructions</p>
        <div>
          <button type="submit">Send Instructions</button>
        </div>
      </form>
      <p>Did you remember your password?</p>
      <Link to={'/login'}>Try logging in</Link>
    </>
  )
}


export default PasswordRestore
