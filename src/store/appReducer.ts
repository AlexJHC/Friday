import {Dispatch} from 'redux'
import {authAPI} from '../api/api'
import {setUser} from '../component/2.profile/profileReducer'

const appInitState = {
  isLoading: false,
  Error: '',
  isAuth: false,
}

export const appReducer = (state: RegisterInitStateType = appInitState, action: appActionType): RegisterInitStateType => {
  switch (action.type) {
    case 'app/SET_ERROR':
      return {
        ...state,
        ...action.payload
      }
    case 'app/SET_IS_LOADING_TRUE':
      return {
        ...state,
        ...action.payload
      }
    case 'app/SET_IS_LOADING_FALSE':
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
const setIsLoadingTrue = () => ({
  type: 'app/SET_IS_LOADING_TRUE',
  payload: {
    isLoading: true,
  }
} as const)

const setIsLoadingFalse = () => ({
  type: 'app/SET_IS_LOADING_FALSE',
  payload: {
    isLoading: false,
  }
} as const)

const setError = (Error: string) => ({
  type: 'app/SET_ERROR',
  payload: {
    Error,
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
  authAPI.authMe()
    .then(res => {
      dispatch(setIsAuth(true))
      dispatch(setUser(res.data))
    })
    .catch(e => {
      //const error = e.response ? e.response.data.error : (e.message + ', mode details in the console')
      console.log('Error:', {...e})
    })
}

// type
type RegisterInitStateType = {
  isLoading: boolean
  Error: string
  isAuth: boolean
}

type appActionType = ReturnType<typeof setIsLoadingTrue>
  | ReturnType<typeof setIsLoadingFalse>
  | ReturnType<typeof setError>
  | ReturnType<typeof setIsAuth>

//export type SetIsAuthType = ReturnType<typeof setIsAuth>


