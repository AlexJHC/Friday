import {Link} from "react-router-dom";
import React from "react";

const Password = () => {
  return (
    <>
      <span>This Page will be delete</span>
      <div><Link to={'/password-restore'}>Auth - Forgot Password</Link></div>
      <div><Link to={'/password-on-email'}>Auth - Forgot Password(Check Email)</Link></div>
      <div><Link to={'/create-new-password'}>Auth - Forgot Password(Create new password)</Link></div>
    </>
  )
}

export default Password
