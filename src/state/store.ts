import {combineReducers, createStore} from "redux";
import {taskReducer} from "./taskReducer";
import {todolistReducer} from "./todolistReducer";



const rootReducer = combineReducers({
    todolists : todolistReducer,
    tasks : taskReducer
})


export const store = createStore(rootReducer)

//TYPES
export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store

