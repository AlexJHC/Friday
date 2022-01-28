import {authAPI, LoginDataType} from '../api/api-auth'
import {setPacksEmptyData} from './packsReducer'
import {emptyUser, setUser} from './authReducer'
import {AppThunkType} from './store'

const initialState = {
  isLoading: true,
  error: '',
  isAuth: false,
  isMyId: false,
  isPackList: true,
}

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
  switch (action.type) {
    case "app/SET_IS_PACK_LIST":
    case 'app/SET_ERROR':
    case 'app/SET_IS_LOADING':
    case 'app/SET_IS_AUTH':
    case 'app/SET_IS_MY_ID':
      return {...state, ...action.payload}
    default: {
      return state
    }
  }
}

// Action creators
export const setIsLoading = (isLoading: boolean) => ({
  type: 'app/SET_IS_LOADING',
  payload: {isLoading},
} as const)
export const setIsMyId = (isMyId: boolean) => ({
  type: 'app/SET_IS_MY_ID',
  payload: {isMyId},
} as const)
export const setError = (error: string) => ({
  type: 'app/SET_ERROR',
  payload: {error},
} as const)
export const setIsAuth = (isAuth: boolean) => ({
  type: 'app/SET_IS_AUTH',
  payload: {isAuth},
} as const)
export const setIsPackList = (isPackList: boolean) => ({
  type: 'app/SET_IS_PACK_LIST',
  payload: {isPackList},
} as const)

// Thunk creators
export const checkIsAuth = (): AppThunkType => async dispatch => {
  try {
    const response = await authAPI.authMe()
    dispatch(setIsAuth(true))
    dispatch(setUser(response.data))
  } catch (e) {
    dispatch(setError('You are not authorized'))
  } finally {
    dispatch(setIsLoading(false))
  }
}
export const logIn = (data: LoginDataType): AppThunkType => async dispatch => {
  dispatch(setIsLoading(true))
  try {
    const response = await authAPI.login(data)
    dispatch(setIsAuth(true))
    dispatch(setUser(response.data))
  } catch (e) {
    dispatch(setError('Email or password is incorrect!'))
  } finally {
    dispatch(setIsLoading(false))
  }
}
export const logOut = (): AppThunkType => async dispatch => {
  dispatch(setIsLoading(true))
  await authAPI.logOut()
  dispatch(setPacksEmptyData())
  dispatch(setUser(emptyUser))
  dispatch(setIsAuth(false))
  dispatch(setIsLoading(false))
}

// Types
type InitialStateType = {
  isLoading: boolean
  error: string
  isAuth: boolean
  isMyId: boolean
  isPackList: boolean
}
export type AppActionsType =
  | ReturnType<typeof setIsLoading>
  | ReturnType<typeof setError>
  | ReturnType<typeof setIsAuth>
  | ReturnType<typeof setIsMyId>
  | ReturnType<typeof setIsPackList>
