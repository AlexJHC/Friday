import axios, {AxiosResponse} from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true,
})

export const authAPI = {
  login(data: any) {
    return instance.post('/auth/login', data)
  },
  passwordRecovery(payload: PasswordRestoreData) {
    return axios.post<PasswordRestoreData, AxiosResponse<PasswordResponse>>('https://neko-back.herokuapp.com/2.0/auth/forgot', payload)
  },
    register(data: RegisterDataType) {
        return instance.post<RegisterDataType, AxiosResponse<RegisterResponseType>>('auth/register', data)
    },
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