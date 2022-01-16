import React, {useEffect, useState} from 'react'
import style from './Error.module.css'
import {useDispatch, useSelector} from 'react-redux'
import {setError} from '../../../store/appReducer'
import {AppRootStateType} from '../../../store/store'


const Error = () => {

  const dispatch = useDispatch()
  const errorValue = useSelector<AppRootStateType, string>(state => state.app.error)

  const [active, setActive] = useState('')

  const activeStyle = active !== '' ? style.active : ''

  useEffect(() => {
    if (errorValue !== '') {
      setActive('active')
    }
    const timer = setTimeout(() => {
      setActive('')
      setTimeout(() => {
        dispatch(setError(''))
      }, 1000)
    }, 3000)
    return () => clearTimeout(timer)
  }, [errorValue])

  return (
    <div className={`${style.error} ${activeStyle}`}>
      <span>{errorValue}</span>
    </div>
  )
}

export default Error
