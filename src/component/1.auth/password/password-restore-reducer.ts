import {authAPI} from "../../../api/api";
import {AppDispatch} from "../../../store/store";
import {passwordRestoreMessage} from "./passwordRestoreMessage";

const initialState: PasswordInitialState = {
  restoreEmail: '',
  sendingEmailSuccess: false,
  changingPasswordSuccess: false
}

export const passwordRestoreReducer = (state: PasswordInitialState = initialState, action: PasswordActions): PasswordInitialState => {
  switch (action.type) {
    case 'password/SET_RESTORE_EMAIL':
      return {
        ...state, restoreEmail: action.payload.email
      }
    case 'password/SET_SENDING_EMAIL_SUCCESS':
      return {
        ...state, sendingEmailSuccess: action.payload.isSuccess
      }
    case 'password/SET_CHANGING_PASSWORD_SUCCESS':
      return {
        ...state, changingPasswordSuccess: action.payload.isSuccess
      }
    default: {
      return state
    }
  }
}

// action creators
export const setEmailRestore = (email: string) => ({
  type: 'password/SET_RESTORE_EMAIL',
  payload: {email}
} as const)
export const setSendingEmailSuccess = (isSuccess: boolean) => ({
  type: 'password/SET_SENDING_EMAIL_SUCCESS',
  payload: {isSuccess}
} as const)
export const setChangingPasswordSuccess = (isSuccess: boolean) => ({
  type: 'password/SET_CHANGING_PASSWORD_SUCCESS',
  payload: {isSuccess}
} as const)


// thunk
export const restoreThroughEmail = (email: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await authAPI.passwordRestore(passwordRestoreMessage(email))
    // console.log(response)
    dispatch(setSendingEmailSuccess(true))
    dispatch(setEmailRestore(email))
    // debugger
  } catch (e) {
    alert(e)
  } finally {
    dispatch(setSendingEmailSuccess(false))
  }
}
export const createNewPassword = (password: string, resetPasswordToken: string | undefined) => async (dispatch: AppDispatch) => {
  try {
    const response = await authAPI.newPassword({password, resetPasswordToken})
    console.log(response)
    dispatch(setChangingPasswordSuccess(true))
  } catch (e) {
    console.log(e)
  } finally {
    dispatch(setChangingPasswordSuccess(false))
  }
}

// types
export type PasswordInitialState = {
  restoreEmail: string
  sendingEmailSuccess: boolean
  changingPasswordSuccess: boolean
}
export type PasswordActions =
  | ReturnType<typeof setEmailRestore>
  | ReturnType<typeof setSendingEmailSuccess>
  | ReturnType<typeof setChangingPasswordSuccess>
