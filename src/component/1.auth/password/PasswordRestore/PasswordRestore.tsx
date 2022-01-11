import React, {FormEvent} from "react";
import {Link} from "react-router-dom";

const PasswordRestore = () => {

  const onsubmit = (e: FormEvent) => {
    e.preventDefault()
  }

  return (
    <>
      <h3>Forgot your password?</h3>
      <form onSubmit={onsubmit}>
        <div>
          <label>
            Email<br/>
            <input type="text" name="email"/>
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
