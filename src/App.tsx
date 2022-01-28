import React, {useEffect} from 'react'
import './App.css'
import AppRoutes from './component/4.routes/AppRoutes'
import {useDispatch, useSelector} from 'react-redux'
import {checkIsAuth} from './store/appReducer'
import Spinner from './component/3.features/Loading/Spinner'
import {AppRootStateType} from './store/store'
import Error from './component/3.features/Error/Error'

function App() {

  const dispatch = useDispatch()

  const isLoading = useSelector<AppRootStateType, boolean>(state => state.app.isLoading)

  useEffect(() => {
    dispatch(checkIsAuth())
  }, [dispatch])

  useEffect(() => {
    isLoading && document.body.classList.add('active')
    return () => document.body.classList.remove('active')
  }, [isLoading])

  return (
    <>
      {isLoading && <Spinner/>}
      <AppRoutes/>
      <Error/>
    </>
  )
}

export default App
