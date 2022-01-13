import axios, {AxiosResponse} from 'axios'

const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

export const authAPI = {
    login(data: LoginDataType) {
        return instance.post<LoginDataType, AxiosResponse<LoginDataResponseType>>('/auth/login', data)
    },
    passwordRecovery(payload: PasswordRestoreData) {
        return instance.post<PasswordRestoreData, AxiosResponse<PasswordResponse>>('auth/forgot', payload)
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
export type LoginDataType = {
    email: string
    password: string
    rememberMe: boolean
}

type LoginDataResponseType = {
    avatar: string
    created: string
    deviceTokens: deviceTokensType[]
    email: string
    isAdmin: boolean
    name: string
    publicCardPacksCount: number
    rememberMe: boolean
    token: string
    tokenDeathTime: number
    updated: string
    verified: boolean
    __v: number
    _id: string
}

type deviceTokensType = {
    _id: string
    device: string
    token: string
    tokenDeathTime: number
}