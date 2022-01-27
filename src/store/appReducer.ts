import {Dispatch} from 'redux'
import {authAPI, LoginDataType} from '../api/api-auth'
import {setPacksEmptyData} from "./packsReducer";
import {emptyUser, setUser} from './authReducer'

const appInitState = {
  isLoading: true,
  error: '',
  isAuth: false,
  isMyId: false
}

export const appReducer = (state: AppInitStateType = appInitState, action: AppActionType): AppInitStateType => {
  switch (action.type) {
    case 'app/SET_ERROR':
    case 'app/SET_IS_LOADING':
    case 'app/SET_IS_AUTH':
    case "app/SET_IS_MY_ID":
      return {...state, ...action.payload}
    default: {
      return state
    }
  }
}

// action
export const setIsLoading = (isLoading: boolean) => ({
  type: 'app/SET_IS_LOADING',
  payload: {
    isLoading
  }
} as const)

export const setIsMyId = (isMyId: boolean) => ({
  type: 'app/SET_IS_MY_ID',
  payload: {
    isMyId
  }
} as const)


export const setError = (error: string) => ({
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
  // dispatch(setIsLoading(true))
  authAPI.authMe()
    .then(res => {
      dispatch(setIsAuth(true))
      dispatch(setUser(res.data))
    })
    .catch(() => {
      dispatch(setError('You are not authorized'))
    })
    .finally(() => {
      dispatch(setIsLoading(false))
    })
}

export const LogInStatus = (data: LoginDataType) => (dispatch: Dispatch) => {
  dispatch(setIsLoading(true))
  authAPI.login(data)
    .then(res => {
      dispatch(setIsAuth(true))
      dispatch(setUser(res.data))
    })
    .catch(err => {
      if (err.response.data.error) {
        dispatch(setError(err.response.data.error))
      } else {
        dispatch(setError('Please try again'))
      }
    })
    .finally(() => {
      dispatch(setIsLoading(false))
    })
}

export const logOut = () => (dispatch: Dispatch) => {
  dispatch(setIsLoading(true))
  authAPI.logOut()
    .then(() => {

      dispatch(setPacksEmptyData())
      dispatch(setUser(emptyUser))
      dispatch(setIsAuth(false))
    })
    .finally(() => {
      dispatch(setIsLoading(false))
    })
}

// type
type AppInitStateType = {
  isLoading: boolean
  error: string
  isAuth: boolean
  isMyId: boolean
}

export type AppActionType =
  | ReturnType<typeof setIsLoading>
  | ReturnType<typeof setError>
  | ReturnType<typeof setIsAuth>
  | ReturnType<typeof setIsMyId>
