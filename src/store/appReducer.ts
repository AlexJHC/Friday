import {Dispatch} from 'redux'
import {authAPI, LoginDataType} from '../api/api'
import {setUser} from '../component/2.profile/profileReducer'

const appInitState = {
  isLoading: false,
  error: '',
  isAuth: false,
}

export const appReducer = (state: AppInitStateType = appInitState, action: AppActionType): AppInitStateType => {
  switch (action.type) {
    case 'app/SET_ERROR':
      return {
        ...state,
        ...action.payload
      }
    case 'app/SET_IS_LOADING':
      return {
        ...state,
        ...action.payload
      }
    case 'app/SET_IS_AUTH': {
      return {...state, ...action.payload}
    }
    default: {
      return state
    }
  }
}

// action
const setIsLoading = (isLoading: boolean) => ({
  type: 'app/SET_IS_LOADING',
  payload: {
    isLoading
  }
} as const)


const setError = (error: string) => ({
  type: 'app/SET_ERROR',
  payload: {
    error: error,
  }
} as const)

export const setIsAuth = (isAuth: boolean) => ({
  type: 'app/SET_IS_AUTH',
  payload: {
    isAuth
  }
} as const)

// Thunk
export const checkIsAuth = () => (dispatch: Dispatch) => {
  dispatch(setIsLoading(true))
  authAPI.authMe()
    .then(res => {
      dispatch(setIsAuth(true))
      dispatch(setUser(res.data))
      dispatch(setIsLoading(false))
    })
    .catch(e => {
      //const error = e.response ? e.response.data.error : (e.message + ', mode details in the console')
      console.log('Error:', {...e})
    })
}

export const LogInStatus = (data: LoginDataType) => (dispatch: Dispatch) => {
  // need global state loading
  authAPI.login(data)
    .then(res => {
      dispatch(setIsAuth(true))
      dispatch(setUser(res.data))
    })
    .catch(err => {
      console.log(err.response.data.error)
      //dispatch(setIsAuth(false))
    })
}

export const logOut = () => (dispatch: Dispatch) => {
  dispatch(setIsLoading(true))
  authAPI.logOut()
    .then(() => {
      const emptyUser = {
        _id: '',
        email: '',
        name: '',
        avatar: '',
        publicCardPacksCount: 0,
        created: new Date(),
        updated: new Date(),
        isAdmin: false,
        verified: false,
        rememberMe: false,
        error: ''
      }
      dispatch(setUser(emptyUser))
      dispatch(setIsAuth(false))
      dispatch(setIsLoading(false))
    })
}

// type
type AppInitStateType = {
  isLoading: boolean
  error: string
  isAuth: boolean
}

type AppActionType =
  | ReturnType<typeof setIsLoading>
  | ReturnType<typeof setError>
  | ReturnType<typeof setIsAuth>
