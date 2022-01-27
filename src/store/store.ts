import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk, {ThunkAction} from 'redux-thunk'
import {PacksActionsType, packsReducer} from './packsReducer'
import {CardsActionsType, cardsReducer} from './cardsReducer'
import {AppActionsType, appReducer} from './appReducer'
import {AuthActionsType, authReducer} from './authReducer'

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  packs: packsReducer,
  cards: cardsReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppRootActionsType =
  | AppActionsType
  | AuthActionsType
  | PacksActionsType
  | CardsActionsType
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppRootActionsType>

// Global object
// @ts-ignore
window.store = store
