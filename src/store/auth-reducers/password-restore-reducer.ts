import {AppDispatch} from '../store'
import {setError, setIsLoading} from '../appReducer'
import {authAPI} from '../../api/api-auth'
import {
  passwordRestoreMessage
} from '../../component/1.auth/password/passwordRestoreMessage'
import {emailRegExp, passwordLength} from '../../component/3.features/Helpers/Helpers'

const initialState: PasswordInitialStateType = {
  restoreEmail: '',
  isEmailSent: false,
  isPasswordChanged: false
}

export const passwordRestoreReducer = (state: PasswordInitialStateType = initialState, action: PasswordActionsType): PasswordInitialStateType => {
  switch (action.type) {
    case 'auth/SET_RESTORE_EMAIL':
    case 'auth/SET_IS_EMAIL_SENT':
    case 'auth/SET_IS_PASSWORD_CHANGED':
      return {...state, ...action.payload}
    default: {
      return state
    }
  }
}

// action creators
export const setRestoreEmail = (restoreEmail: string) => ({
  type: 'auth/SET_RESTORE_EMAIL',
  payload: {restoreEmail}
} as const)
export const setIsEmailSent = (isEmailSent: boolean) => ({
  type: 'auth/SET_IS_EMAIL_SENT',
  payload: {isEmailSent}
} as const)
export const setIsPasswordChanged = (isPasswordChanged: boolean) => ({
  type: 'auth/SET_IS_PASSWORD_CHANGED',
  payload: {isSuccess: isPasswordChanged}
} as const)

// thunk
export const restoreThroughEmail = (email: string) => async (dispatch: AppDispatch) => {
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
export const createNewPassword = (password: string, resetPasswordToken: string | undefined) => async (dispatch: AppDispatch) => {
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

// types
export type PasswordInitialStateType = {
  restoreEmail: string
  isEmailSent: boolean
  isPasswordChanged: boolean
}
export type PasswordActionsType =
  | SetRestoreEmailActionType
  | SetIsEmailSentActionType
  | SetIsPasswordChangedActionType
export type SetRestoreEmailActionType = ReturnType<typeof setRestoreEmail>
export type SetIsEmailSentActionType = ReturnType<typeof setIsEmailSent>
export type SetIsPasswordChangedActionType = ReturnType<typeof setIsPasswordChanged>
