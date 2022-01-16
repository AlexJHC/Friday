import React, {useEffect, useState} from 'react'
import style from './Error.module.css'
import {useDispatch} from 'react-redux'
import {setError} from '../../../store/appReducer'

type PropsType = {
  value: string
}

const Error: React.FC<PropsType> = ({value}) => {

  const dispatch = useDispatch()

  const [active, setActive] = useState('')

  const isActiveStyle = active !== '' ? style.active : ''

  useEffect(() => {
    if (value !== '') {
      setActive('active')
    }
    const timer = setTimeout(() => {
      setActive('')
      setTimeout(() => {
        dispatch(setError(''))
      }, 1000)
    }, 4000)
    return () => clearTimeout(timer)
  }, [value])

  return (
    <div className={`${style.error} ${isActiveStyle}`}>
      <span>{value}</span>
    </div>
  )
}

export default Error
