import axios, {AxiosResponse} from 'axios'
import {ProfileType} from '../component/2.profile/profileReducer'

const instance = axios.create({
  //baseURL: 'https://neko-back.herokuapp.com/2.0/',
  baseURL: 'http://localhost:7542/2.0/',
  withCredentials: true,
})

export const authAPI = {
  login(data: any) {
    return instance.post('/auth/login', data)
  },
  passwordRecovery(payload: PasswordRestoreData) {
    return instance.post<PasswordRestoreData, AxiosResponse<PasswordResponse>>('auth/forgot', payload)
  },
  register(data: RegisterDataType) {
    return instance.post<RegisterDataType, AxiosResponse<RegisterResponseType>>('auth/register', data)
  },
  authMe() {
    return instance.post<IsAuthResponseType>('auth/me')
  }
}

export type PasswordRestoreData = {
  email: string,
  from: string,
  message: string
}
export type PasswordResponse = {
  info: string,
  error: string
}
export type RegisterDataType = {
  email: string
  password: string
}
type RegisterResponseType = {
  error?: string
}
type IsAuthResponseType = ProfileType & {
  error: string
}