import React, {useEffect} from 'react'
import './App.css'
import {Link} from 'react-router-dom'
import AppRoutes from './component/4.routes/AppRoutes'
import {useDispatch, useSelector} from 'react-redux'
import {checkIsAuth} from './store/appReducer'
import Spinner from "./component/3.features/Loading/Spinner";
import {AppRootStateType} from "./store/store";

function App() {

  const dispatch = useDispatch()
  const isLoading = useSelector<AppRootStateType, boolean>(state => state.app.isLoading)

  useEffect(() => {
    dispatch(checkIsAuth())
  }, [dispatch])

  return (
    <>
      {isLoading && <Spinner/>}
      <nav style={{display: 'flex', gap: '20px', justifyContent: 'center'}}>
        <Link to={'/'}>Home</Link>
        <Link to={'/login'}>login</Link>
        <Link to={'/password'}>password</Link>
        <Link to={'/password-restore'}>password restore</Link>
        <Link to={'/profile'}>profile</Link>
        <Link to={'/registration'}>registration</Link>
      </nav>
      <hr/>
      <AppRoutes/>
    </>
  )
}

export default App
