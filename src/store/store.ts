import {applyMiddleware, combineReducers, createStore} from 'redux'
import {profileReducer} from '../component/2.profile/profileReducer'
import {packsReducer} from './packsReducer'
import {cardsReducer} from './cardsReducer'
import thunk from 'redux-thunk'

import {appReducer} from './appReducer'
import {passwordRestoreReducer} from './auth-reducers/password-restore-reducer'
import {registerReducer} from './auth-reducers/registerReducer'

export type AppRootStateType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
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
