import React, {FormEvent} from "react";

const NewPassword = () => {

  const onsubmit = (e: FormEvent) => {
    e.preventDefault()
  }

  return (
    <>
      <h3>Create new password</h3>
      <form onSubmit={onsubmit}>
        <div>
          <label>
            Password<br/>
            <input type="password" name="password"/>
          </label>
        </div>
        <p>Create new password and we will send you further instructions to email</p>
        <div>
          <button type="submit">Create new password</button>
        </div>
      </form>
    </>
  )
}

export default NewPassword
