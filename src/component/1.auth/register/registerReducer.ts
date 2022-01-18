import {Dispatch} from 'redux'
import {authAPI, RegisterDataType} from '../../../api/api-auth'
import {setError, setIsLoading} from '../../../store/appReducer'

const registerInitState = {
  isRegisterSuccess: false
}

export const registerReducer = (state: RegisterInitStateType = registerInitState, action: RegisterActionType): RegisterInitStateType => {
  switch (action.type) {
    case 'registration/SET_REGISTER_STATUS':
      return {...state, ...action.payload}
    default: {
      return state
    }
  }
}

// Action
export const setRegisterStatus = (isRegisterSuccess: boolean) => ({
  type: 'registration/SET_REGISTER_STATUS',
  payload: {
    isRegisterSuccess
  }
} as const)

// Thunk
export const signUp = (signUpFormData: SignUpFormDataType) => (dispatch: Dispatch) => {
  const {confirm, ...registerData} = signUpFormData
  if (registerData.password !== confirm) {
    dispatch(setError('Passwords don\'t match!'))
  } else {
    dispatch(setIsLoading(true))
    authAPI.register(registerData)
      .then(() => {
        dispatch(setRegisterStatus(true))
      })
      .catch(() => {
        dispatch(setError('Email or password is not valid'))
      })
      .finally(() => {
        dispatch(setIsLoading(false))
      })
  }
}

// Type
type RegisterInitStateType = typeof registerInitState
type RegisterActionType = ReturnType<typeof setRegisterStatus>
export type SignUpFormDataType = RegisterDataType & {
  confirm: string
}
