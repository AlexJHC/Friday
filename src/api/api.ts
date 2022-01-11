import axios, {AxiosResponse} from 'axios'

// const instance = axios.create({
//     baseURL: 'https://neko-back.herokuapp.com/2.0/',
//     withCredentials: true
// })

const instance = axios.create({
    baseURL: 'http://localhost:7540/2.0/',
    withCredentials: true,
})

export const authApi = {
    register(data: RegisterDataType) {
        return instance.post<RegisterDataType,AxiosResponse<RegisterResponseType>>('auth/register', data)
    }
}

// Type
type RegisterDataType = {
    email: string
    password: string
}
type RegisterResponseType={
    error?:string
}