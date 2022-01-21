import {Dispatch} from "redux";
import {authAPI, renameDataType} from "../../api/api-auth";
import {setError, setIsLoading} from "../../store/appReducer";

const profileInitState = {
  user: {
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
  } as ProfileType,
}

export const profileReducer = (state: InitStateType = profileInitState, action: ProfileActionsType): InitStateType => {
  switch (action.type) {
    case 'profile/SET_USER': {
      return {...state, ...action.payload}
    }
    default: {
      return state
    }
  }
}

// Actions
export const setUser = (user: ProfileType) => ({
  type: 'profile/SET_USER',
  payload: {
    user
  }
} as const)

// Thunk
export const renameNick = (data: renameDataType) => (dispatch: Dispatch) => {
  dispatch(setIsLoading(true))
  authAPI.rename(data)
    .then(res =>
      dispatch(setUser(res.data.updatedUser))
    )
    .catch(err => {
        if (err.response.data.error) {
          dispatch(setError(err.response.data.error))
        } else {
          dispatch(setError('Please try again'))
        }
      }
    )
    .finally(() => dispatch(setIsLoading(false)))
}

// Types
type InitStateType = typeof profileInitState
export type ProfileType = {
  _id: string
  email: string
  name: string
  avatar?: string
  publicCardPacksCount: number
  created: Date
  updated: Date
  isAdmin: boolean
  verified: boolean
  rememberMe: boolean
}
type ProfileActionsType = SetUserActionType
type SetUserActionType = ReturnType<typeof setUser>
