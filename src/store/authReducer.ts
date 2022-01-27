import {AppDispatch} from './store'
import {setError, setIsLoading} from './appReducer'
import {emailRegExp, passwordLength} from '../component/3.features/Helpers/Helpers'
import {authAPI, RegisterDataType} from '../api/api-auth'
import {passwordRestoreMessage} from '../component/1.auth/password/passwordRestoreMessage'
import {Dispatch} from 'redux'

const initialState: AuthInitialStateType = {
  isRegisterSuccess: false,
  restoreEmail: '',
  isEmailSent: false,
  isPasswordChanged: false,
}

export const authReducer = (state: AuthInitialStateType = initialState, action: AuthActionsType): AuthInitialStateType => {
  switch (action.type) {
    case 'auth/SET_REGISTER_STATUS':
    case 'auth/SET_RESTORE_EMAIL':
    case 'auth/SET_IS_EMAIL_SENT':
    case 'auth/SET_IS_PASSWORD_CHANGED':
      return {...state, ...action.payload}
    default: {
      return state
    }
  }
}

// Action creators
export const setRegisterStatus = (isRegisterSuccess: boolean) => ({
  type: 'auth/SET_REGISTER_STATUS',
  payload: {isRegisterSuccess}
} as const)
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

// Thunk creators
export const signUp = (signUpFormData: SignUpFormDataType) => async (dispatch: Dispatch) => {
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

// Types
export type AuthInitialStateType = {
  isRegisterSuccess: boolean
  restoreEmail: string
  isEmailSent: boolean
  isPasswordChanged: boolean
}
export type SignUpFormDataType = RegisterDataType & {
  confirm: string
}
export type AuthActionsType =
  | SetRestoreEmailActionType
  | SetIsEmailSentActionType
  | SetIsPasswordChangedActionType
  | SetRegisterStatusActionType
export type SetRestoreEmailActionType = ReturnType<typeof setRestoreEmail>
export type SetIsEmailSentActionType = ReturnType<typeof setIsEmailSent>
export type SetIsPasswordChangedActionType = ReturnType<typeof setIsPasswordChanged>
export type SetRegisterStatusActionType = ReturnType<typeof setRegisterStatus>
