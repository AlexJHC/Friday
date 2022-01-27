import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk from 'redux-thunk'
import {packsReducer} from './packsReducer'
import {cardsReducer} from './cardsReducer'
import {appReducer} from './appReducer'
import {authReducer} from './authReducer'

export type AppRootStateType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  packs: packsReducer,
  cards: cardsReducer,
})
export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppDispatch = typeof store.dispatch

// Global object
// @ts-ignore
window.store = store
