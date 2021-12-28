import {v1} from "uuid";
import {TaskType} from "../Todolist";
import {AddTodolistActionType, RemoveTodolistActionType, todolistID1, todolistID2} from "./todolistReducer";

let initialState: InitialStateType = {
    [todolistID1]: [
        {id: "1", title: "HTML", isDone: true},
        {id: "2", title: "Css", isDone: true},
        {id: "3", title: "React", isDone: false},
    ],
    [todolistID2]: [
        {id: "1", title: "Banana", isDone: true},
        {id: "2", title: "Berry", isDone: false},
        {id: "3", title: "Icecream", isDone: false},
    ]
}

export const taskReducer = (state: InitialStateType = initialState, action: UnionActionType_TASK_REDUCER): InitialStateType => {
    switch (action.type) {
        case "REMOVE_TASK/TASK_REDUCER": {
            return {
                ...state, [action.todolistID]: state[action.todolistID]
                    .filter((t) => t.id !== action.taskID)
            }
        }
        case "ADD_TASK/TASK_REDUCER" : {
            return {
                ...state,
                [action.todolistID]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistID]]
            }
        }
        case "CHANGE_TASK_STATUS/TASK_REDUCER": {
            return {
                ...state,
                [action.todolistID]: [...state[action.todolistID].map((t) => t.id === action.taskID ? {
                    ...t,
                    isDone: action.isDone
                } : t)]
            }
        }
        case "CHANGE_TASK_TITLE/TASK_REDUCER": {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(t => t.id === action.taskID ? {
                    ...t,
                    title: action.newTitle
                } : t)
            }
        }
        case "ADD_TODOLIST/TODOLIST_REDUCER": {
            return {...state, [action.todolistID]: []}
        }
        case "REMOVE_TODOLIST/TODOLIST_REDUCER": {
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        }
        default : {
            return state
        }
    }
}

//ACTION CREATORS  /TASK_REDUCER
export const removeTaskAC = (todolistID: string, taskID: string) => ({
    type: "REMOVE_TASK/TASK_REDUCER",
    todolistID,
    taskID
} as const)
export const addTaskAC = (todolistID: string, title: string) => ({
    type: "ADD_TASK/TASK_REDUCER",
    todolistID,
    title
} as const)
export const changeTaskStatusAC = (todolistID: string, taskID: string, isDone: boolean) => ({
    type: "CHANGE_TASK_STATUS/TASK_REDUCER",
    todolistID,
    taskID,
    isDone
} as const)
export const changeTaskTitleAC = (todolistID: string, taskID: string, newTitle: string) => ({
    type: "CHANGE_TASK_TITLE/TASK_REDUCER",
    todolistID,
    taskID,
    newTitle
} as const)

//TYPES
export type InitialStateType = {
    [key: string]: Array<TaskType>
}
type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

type UnionActionType_TASK_REDUCER =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType