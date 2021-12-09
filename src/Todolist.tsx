import React, {ChangeEvent, KeyboardEvent, useState} from "react";

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
}

export const Todolist = (props: PropsType) => {
    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setNewTaskTitle(e.currentTarget.value)
    }
    const onEnterKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === "Enter") {
            props.addTask(newTaskTitle, props.id)
            setNewTaskTitle("")
        }
    }
    const addTask = () => {
        if (newTaskTitle.trim().length > 0) {
            props.addTask(newTaskTitle.trim(), props.id)
        } else {
            setError("Title required blet")
        }
        setNewTaskTitle("")
    }
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


    return (
        <div>
            <h3>{props.title}
                <button onClick={removeTodolist}>remove todolist</button>
            </h3>

            <div>
                <input value={newTaskTitle}
                       onChange={onNewTitleChangeHandler}
                       onKeyPress={onEnterKeyPressHandler}
                       className={error ? "error" : ""}
                />
                <button onClick={addTask}>+
                </button>
                {error && <div className={"error-message"}>{error}</div>}
            </div>
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
                            <span>{task.title}</span>
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

export type FilterValueType = "all" | "active" | "completed"