import {AppThunkType} from './store'

import {setError, setIsLoading} from './appReducer'
import {authAPI, RegisterDataType, renameDataType} from '../api/api-auth'
import {passwordRestoreMessage} from '../component/1.auth/password/passwordRestoreMessage'
import { emailRegExp, passwordLength } from '../utils/helpers'

export const emptyUser = {
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
  error: '',
}

const initialState: InitialStateType = {
  isRegisterSuccess: false,
  restoreEmail: '',
  isEmailSent: false,
  isPasswordChanged: false,
  user: emptyUser,
}

export const authReducer = (state: InitialStateType = initialState, action: AuthActionsType): InitialStateType => {
  switch (action.type) {
    case 'auth/SET_REGISTER_STATUS':
    case 'auth/SET_RESTORE_EMAIL':
    case 'auth/SET_IS_EMAIL_SENT':
    case 'auth/SET_IS_PASSWORD_CHANGED':
    case 'auth/SET_USER':
      return {...state, ...action.payload}
    default: {
      return state
    }
  }
}

// Action creators
export const setRegisterStatus = (isRegisterSuccess: boolean) => ({
  type: 'auth/SET_REGISTER_STATUS',
  payload: {isRegisterSuccess},
} as const)
export const setRestoreEmail = (restoreEmail: string) => ({
  type: 'auth/SET_RESTORE_EMAIL',
  payload: {restoreEmail},
} as const)
export const setIsEmailSent = (isEmailSent: boolean) => ({
  type: 'auth/SET_IS_EMAIL_SENT',
  payload: {isEmailSent},
} as const)
export const setIsPasswordChanged = (isPasswordChanged: boolean) => ({
  type: 'auth/SET_IS_PASSWORD_CHANGED',
  payload: {isPasswordChanged},
} as const)
export const setUser = (user: ProfileType) => ({
  type: 'auth/SET_USER',
  payload: {user},
} as const)

// Thunk creators
export const signUp = (signUpFormData: SignUpFormDataType): AppThunkType => async dispatch => {
  const {confirm, ...registerData} = signUpFormData
  try {
    dispatch(setIsLoading(true))
    if (!emailRegExp(registerData.email)) {
      dispatch(setError('Email is invalid!'))
    } else if (!passwordLength(registerData.password)) {
      dispatch(setError('Password length should be more than 7 characters'))
    } else if (registerData.password !== confirm) {
      dispatch(setError('Passwords don\'t match!'))
    } else {
      await authAPI.register(registerData)
      dispatch(setRegisterStatus(true))
    }
  } catch (e) {
    dispatch(setError('Email already exists!'))
  } finally {
    dispatch(setIsLoading(false))
  }
}
export const restoreThroughEmail = (email: string): AppThunkType => async dispatch => {
  dispatch(setIsLoading(true))
  try {
    if (!emailRegExp(email)) {
      dispatch(setError('Email address is not valid!'))
    } else {
      await authAPI.passwordRestore(passwordRestoreMessage(email))
      dispatch(setIsEmailSent(true))
      dispatch(setRestoreEmail(email))
    }
  } catch (e) {
    dispatch(setError('Email not found!'))
  } finally {
    dispatch(setIsEmailSent(false))
    dispatch(setIsLoading(false))
  }
}
export const createNewPassword = (password: string, resetPasswordToken: string | undefined): AppThunkType => async dispatch => {
  dispatch(setIsLoading(true))
  try {
    if (!passwordLength(password)) {
      dispatch(setError('Password length should be more than 7 characters!'))
    } else {
      await authAPI.newPassword({password, resetPasswordToken})
      dispatch(setIsPasswordChanged(true))
    }
  } catch (e) {
    dispatch(setError('Error! Please try again.'))
  } finally {
    dispatch(setIsPasswordChanged(false))
    dispatch(setIsLoading(false))
  }
}
export const renameNick = (data: renameDataType): AppThunkType => async dispatch => {
  dispatch(setIsLoading(true))
  try {
    const response = await authAPI.rename(data)
    dispatch(setUser(response.data.updatedUser))
  } catch (e) {
    dispatch(setError('Please try again'))
  } finally {
    dispatch(setIsLoading(false))
  }
}

// Types
type InitialStateType = {
  isRegisterSuccess: boolean
  restoreEmail: string
  isEmailSent: boolean
  isPasswordChanged: boolean
  user: ProfileType
}
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
export type SignUpFormDataType = RegisterDataType & {
  confirm: string
}
export type AuthActionsType =
  | ReturnType<typeof setRegisterStatus>
  | ReturnType<typeof setRestoreEmail>
  | ReturnType<typeof setIsEmailSent>
  | ReturnType<typeof setIsPasswordChanged>
  | ReturnType<typeof setUser>
