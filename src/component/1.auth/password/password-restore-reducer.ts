import {authAPI} from "../../../api/api";
import {AppDispatch} from "../../../store/store";
import {passwordRestoreMessage} from "./passwordRestoreMessage";

const initialState: PasswordInitialState = {
  restoreEmail: '',
}

export const passwordRestoreReducer = (state: PasswordInitialState = initialState, action: PasswordActions): PasswordInitialState => {
  switch (action.type) {
    case 'password/SET_RESTORE_EMAIL':
      return {
        ...state, restoreEmail: action.payload.email
      }
    default: {
      return state
    }
  }
}

// action creators
export const setEmailRecovery = (email: string) => ({
  type: 'password/SET_RESTORE_EMAIL',
  payload: {email}
} as const)


// thunk
export const passwordRecovery = (email: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await authAPI.passwordRecovery(passwordRestoreMessage(email))
    console.log(response)
    // debugger
    dispatch(setEmailRecovery(email))
  } catch (e) {
    console.log(e)
  }
}

// types
export type PasswordInitialState = {
  restoreEmail: string
}
export type PasswordActions =
  | ReturnType<typeof setEmailRecovery>
