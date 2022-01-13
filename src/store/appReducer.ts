const appInitState = {
    isLoading: false,
    Error: ''
}

export const appReducer = (state: RegisterInitStateType = appInitState, action: appActionType): RegisterInitStateType => {
    switch (action.type) {
        case "app/SET_ERROR":
            return {
                ...state,
                ...action.payload
            }
        case "app/SET_IS_LOADING_TRUE":
            return {
                ...state,
                ...action.payload
            }
        case "app/SET_IS_LOADING_FALSE":
            return {
                ...state,
                ...action.payload
            }
        default: {
            return state
        }
    }
}

// action
const setIsLoadingTrue = () => ({
    type: 'app/SET_IS_LOADING_TRUE',
    payload: {
        isLoading: true,
    }
} as const)

const setIsLoadingFalse = () => ({
    type: 'app/SET_IS_LOADING_FALSE',
    payload: {
        isLoading: false,
    }
} as const)

const setError = (Error: string) => ({
    type: 'app/SET_ERROR',
    payload: {
        Error,
    }
} as const)

// type
type RegisterInitStateType = {
    isLoading: boolean
    Error: string
}

type appActionType = ReturnType<typeof setIsLoadingTrue>
    | ReturnType<typeof setIsLoadingFalse>
    | ReturnType<typeof setError>


