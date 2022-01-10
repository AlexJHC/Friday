import {combineReducers, createStore} from "redux";
import {loginReducer} from "./loginReducer";
import {registerReducer} from "./registerReducer";
import {profileReducer} from "./profileReducer";
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