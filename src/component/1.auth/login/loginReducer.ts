import {authAPI, LoginDataType} from "../../../api/api";
import {Dispatch} from "redux";

const loginInitState = {
    isLoggedIn: false
}

export const loginReducer = (state: loginInitStateType = loginInitState, action: ActionLoginType): loginInitStateType => {
    switch (action.type) {
        case "login/SET_IS_LOGGED_IN":
            return {...state, ...action.payload}
        default: {
            return state
        }
    }
};

// actions
export const setIsLoggedIn = (isLoggedIn: boolean) =>
    ({
        type: 'login/SET_IS_LOGGED_IN',
        payload: {
            isLoggedIn
        }
    } as const)


// thunks
export const LogInStatus = (data: LoginDataType) => (dispatch: Dispatch) => {
    // need global state loading
    authAPI.login(data)
        .then(res => {
            setIsLoggedIn(true)
        })
        .catch(err => {
            console.log(err.response.data.error)
            setIsLoggedIn(false)
        })
}

// types
type loginInitStateType = typeof loginInitState
type setIsLoggedInType = ReturnType<typeof setIsLoggedIn>

type ActionLoginType = setIsLoggedInType