import {Dispatch} from 'redux'
import {authAPI} from '../api/api'
import {setUser} from '../component/2.profile/profileReducer'

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
export const checkIsAuth = () => (dispatch: Dispatch) => {
  authAPI.authMe()
    .then(res => {
      dispatch(setIsAuth(true))
      dispatch(setUser(res.data))
    })
    .catch(e => {
      //const error = e.response ? e.response.data.error : (e.message + ', mode details in the console')
      console.log('Error:', {...e})
    })
}

// Types
type AppInitStateType = typeof appInitState
type AppActionsType = SetIsAuthType
export type SetIsAuthType = ReturnType<typeof setIsAuth>