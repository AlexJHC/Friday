import {applyMiddleware, combineReducers, createStore} from 'redux'
import {loginReducer} from '../component/1.auth/login/loginReducer'
import {registerReducer} from '../component/1.auth/register/registerReducer'
import {profileReducer} from '../component/2.profile/profileReducer'
import {packsReducer} from './packsReducer'
import {cardsReducer} from './cardsReducer'
import thunk from 'redux-thunk'
import {passwordRestoreReducer} from '../component/1.auth/password/password-restore-reducer'
import {appReducer} from './appReducer'

export type AppRootStateType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
  login: loginReducer,
  register: registerReducer,
  profile: profileReducer,
  packs: packsReducer,
  cards: cardsReducer,
  password: passwordRestoreReducer,
  app: appReducer,
})
export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppDispatch = typeof store.dispatch

// Global object
// @ts-ignore
window.store = store
