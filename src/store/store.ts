import {combineReducers, createStore} from "redux";
import {loginReducer} from "../component/1.auth/login/loginReducer";
import {registerReducer} from "../component/1.auth/Registration/registerReducer";
import {profileReducer} from "../component/2.profile/profileReducer";
import {packsReducer} from "./packsReducer";
import {cardsReducer} from "./cardsReducer";

export type AppRootStateType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    login: loginReducer,
    register: registerReducer,
    profile: profileReducer,
    packs: packsReducer,
    cards: cardsReducer,
})
export const store = createStore(rootReducer)


// Global object
// @ts-ignore
window.store = store;