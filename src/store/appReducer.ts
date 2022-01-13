const appInitState = {
  isAuth: false
}

export const appReducer = (state: AppInitStateType = appInitState, action: AppActionsType): AppInitStateType => {
  switch (action.type) {
    case 'app/SET_IS_AUTH': {
      return {...state, ...action.payload}
    }
    default: {
      return state
    }
  }
}

// Actions
export const setIsAuth = (isAuth: boolean) => ({
  type: 'app/SET_IS_AUTH',
  payload: {
    isAuth
  }
} as const)
// Thunk

// Types
type AppInitStateType = typeof appInitState
type AppActionsType = SetIsAuthType
export type SetIsAuthType = ReturnType<typeof setIsAuth>