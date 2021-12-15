import React, {ChangeEvent} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

//PROPS
type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistID: string, taskID: string) => void
    changeFilter: (value: FilterValueType, todolistID: string) => void
    addTask: (title: string, todolistID: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistID: string) => void
    filter: FilterValueType
    id: string
    removeTodolist: (id: string) => void
    changeTaskTitle: (todolistID: string, taskID: string, newTitle: string) => void
    changeTodolistTitle: (todolistID: string, newTitle: string) => void
}

export const Todolist = (props: PropsType) => {

    const onAllFilterButtonHandler = () => {
        props.changeFilter("all", props.id)
    }
    const onActiveFilterButtonHandler = () => {
        props.changeFilter("active", props.id)
    }
    const onCompletedFilterButtonHandler = () => {
        props.changeFilter("completed", props.id)
    }
    const removeTodolist = () => props.removeTodolist(props.id)

    const addTask = (title: string,) => {
        props.addTask(title, props.id)
    }

    const changeTodolistTitleHandler = (title: string) => {
        props.changeTodolistTitle(props.id, title)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title}
                              changeTitle={changeTodolistTitleHandler}/>
                <button onClick={removeTodolist}>remove todolist</button>
            </h3>
            <AddItemForm addItem={addTask}/>

            <ul>
                {
                    props.tasks.map((task) => {
                        const onRemoveTaskHandler = () => props.removeTask(props.id, task.id)
                        const onTaskStatusChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)
                        }

                        return <li key={task.id} className={task.isDone ? "completed-task" : ""}>
                            <input type="checkbox"
                                   checked={task.isDone}
                                   onChange={onTaskStatusChangeHandler}
                            />
                            {/*<span>{task.title}</span>*/}
                            <EditableSpan title={task.title}
                                          changeTitle={(title: string) => props.changeTaskTitle(props.id, task.id, title)}/>
                            <button onClick={onRemoveTaskHandler}>x</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button className={props.filter === "all" ? "active-filter" : ""}
                        onClick={onAllFilterButtonHandler}>All
                </button>
                <button className={props.filter === "active" ? "active-filter" : ""}
                        onClick={onActiveFilterButtonHandler}>Active
                </button>
                <button className={props.filter === "completed" ? "active-filter" : ""}
                        onClick={onCompletedFilterButtonHandler}>Completed
                </button>
            </div>
        </div>
    )
}


//TYPES
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValueType = "all" | "active" | "completed";