import {Dispatch} from 'redux'
import {authAPI, RegisterDataType} from '../../api/api-auth'
import {emailRegExp, passwordLength} from '../../component/3.features/Helpers/Helpers'
import {setError, setIsLoading} from '../appReducer'


const initialState: RegisterInitialStateType = {
  isRegisterSuccess: false
}

export const registerReducer = (state: RegisterInitialStateType = initialState, action: RegisterActionsType): RegisterInitialStateType => {
  switch (action.type) {
    case 'auth/SET_REGISTER_STATUS':
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

// Types
type RegisterInitialStateType = {
  isRegisterSuccess: boolean
}
export type SignUpFormDataType = RegisterDataType & {
  confirm: string
}
type RegisterActionsType = SetRegisterStatusActionType
export type SetRegisterStatusActionType = ReturnType<typeof setRegisterStatus>

