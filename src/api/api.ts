import axios from 'axios'

// const instance = axios.create({
//     baseURL: 'https://neko-back.herokuapp.com/2.0/',
//     withCredentials: true
// })

const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true
})

export const authAPI = {
    login(data: any) {
        return instance.post('/auth/login', data)
    }
}