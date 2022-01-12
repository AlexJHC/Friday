import {applyMiddleware, combineReducers, createStore} from "redux";
import {loginReducer} from "../component/1.auth/login/loginReducer";
import {registerReducer} from "../component/1.auth/Registration/registerReducer";
import {profileReducer} from "../component/2.profile/profileReducer";
import {packsReducer} from "./packsReducer";
import {cardsReducer} from "./cardsReducer";
import thunkMiddleware from 'redux-thunk'

export type AppRootStateType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    login: loginReducer,
    register: registerReducer,
    profile: profileReducer,
    packs: packsReducer,
    cards: cardsReducer,
})
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))


// Global object
// @ts-ignore
window.store = store;