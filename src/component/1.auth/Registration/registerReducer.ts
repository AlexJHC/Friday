import {Dispatch} from 'redux'
import {authApi, RegisterDataType} from '../../../api/api'

const registerInitState = {
    isRegistered: false
}

export const registerReducer = (state: RegisterInitStateType = registerInitState, action: RegisterActionType): RegisterInitStateType => {
    switch (action.type) {
        case 'registration/SET_IS_REGISTERED':
            return {
                ...state,
                isRegistered: true
            }
        default: {
            return state
        }
    }
}

// Action
export const setRegisteredIn = () => ({
    type: 'registration/SET_IS_REGISTERED',
} as const)

// Thunk
export const registerUser = (registerData: RegisterDataType) => async (dispatch: Dispatch) => {
    try {
        await authApi.register(registerData)
        dispatch(setRegisteredIn())
    } catch (error) {
        console.log(error)
    }
}

// Type
type RegisterInitStateType = typeof registerInitState
type RegisterActionType = ReturnType<typeof setRegisteredIn>
