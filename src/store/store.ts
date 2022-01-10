import {combineReducers, createStore} from "redux";

export type AppRootStateType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({})
export const store = createStore(rootReducer)


// Global object
// @ts-ignore
window.store = store;