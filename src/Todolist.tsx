import React, {ChangeEvent, KeyboardEvent, useState} from "react";

//PROPS
type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValueType) => void
    addTask: (title: string) => void
    changeTaskStatus: (id: string, isDone: boolean) => void
    filter: FilterValueType
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
            props.addTask(newTaskTitle)
            setNewTaskTitle("")
        }
    }
    const addTask = () => {
        if (newTaskTitle.trim().length > 0) {
            props.addTask(newTaskTitle.trim())
        } else {
            setError("Title required blet")
        }
        setNewTaskTitle("")
    }
    const onAllFilterButtonHandler = () => {
        props.changeFilter("all")
    }
    const onActiveFilterButtonHandler = () => {
        props.changeFilter("active")
    }
    const onCompletedFilterButtonHandler = () => {
        props.changeFilter("completed")
    }


    return (
        <div>
            <h3>{props.title}</h3>
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
                        const onRemoveTaskHandler = () => props.removeTask(task.id)
                        const onTaskStatusChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(task.id, e.currentTarget.checked)
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