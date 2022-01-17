import axios, {AxiosResponse} from 'axios'
import {ProfileType} from '../component/2.profile/profileReducer'

const instance = axios.create({
  baseURL: 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
})

export const authAPI = {
  login(data: LoginDataType) {
    return instance.post<LoginDataType, AxiosResponse<IsAuthResponseType>>('/auth/login', data)
  },
  register(data: RegisterDataType) {
    return instance.post<RegisterDataType, AxiosResponse<RegisterResponseType>>('auth/register', data)
  },
  passwordRestore(data: PasswordRestoreData) {
    return instance.post<PasswordRestoreData, AxiosResponse<PasswordResponse>>('auth/forgot', data)
  },
  newPassword(data: NewPasswordData) {
    return instance.post<NewPasswordData, AxiosResponse<PasswordResponse>>('auth/set-new-password', data)
  },
  authMe() {
    return instance.post<IsAuthResponseType>('auth/me')
  },
  logOut() {
    return instance.delete('auth/me')
  },
}

// Types
export type RegisterDataType = {
  email: string
  password: string
}
type RegisterResponseType = {
  error: string
}
export type PasswordRestoreData = {
  email: string
  from: string
  message: string
}
export type PasswordResponse = {
  info: string
  error: string
}
export type NewPasswordData = {
  password: string,
  resetPasswordToken: string | undefined
}
export type LoginDataType = {
  email: string
  password: string
  rememberMe: boolean
}
type IsAuthResponseType = ProfileType & {
  error: string
}
