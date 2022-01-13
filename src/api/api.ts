import axios, {AxiosResponse} from 'axios'

const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

export const authAPI = {
    login(data: any) {
        return instance.post('/auth/login', data)
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
}

export type RegisterDataType = {
    email: string
    password: string
}
type RegisterResponseType = {
    error?: string
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
export type NewPasswordData = {
    password: string,
    resetPasswordToken: string | undefined
}
