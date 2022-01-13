import {Dispatch} from 'redux'
import {authAPI, RegisterDataType} from '../../../api/api'

const registerInitState = {
  isRegistered: false
}

export const registerReducer = (state: RegisterInitStateType = registerInitState, action: RegisterActionType): RegisterInitStateType => {
  switch (action.type) {
    case 'registration/SET_IS_REGISTERED':
      return {
        ...state,
        ...action.payload
      }
    default: {
      return state
    }
  }
}

// Action
export const setRegisteredIn = (isRegistered: boolean) => ({
  type: 'registration/SET_IS_REGISTERED',
  payload: {
    isRegistered
  }
} as const)

// Thunk
export const signIn = (registerData: RegisterDataType) => (dispatch: Dispatch) => {
  authAPI.register(registerData)
    .then(() => {
      dispatch(setRegisteredIn(true))
    })
    .catch(e => {
      console.log(e.response.data.error)
    })
}

// Type
type RegisterInitStateType = typeof registerInitState
type RegisterActionType = ReturnType<typeof setRegisteredIn>
