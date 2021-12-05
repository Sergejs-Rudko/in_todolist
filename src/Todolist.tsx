import React, {ChangeEvent, KeyboardEvent, useState} from "react";

//PROPS
type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValueType) => void
    addTask: (title: string) => void
}

export const Todolist = (props: PropsType) => {
    const [newTaskTitle, setNewTaskTitle] = useState("")

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onEnterKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === "Enter") {
            props.addTask(newTaskTitle)
            setNewTaskTitle("")
        }
    }
    const addTask = () => {
        props.addTask(newTaskTitle)
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
                />
                <button onClick={addTask}>+
                </button>
            </div>
            <ul>
                {
                    props.tasks.map((task) => {
                        const onRemoveTaskHandler = () => props.removeTask(task.id)

                        return <li key={task.id}>
                            <input type="checkbox" checked={task.isDone}/>
                            <span>{task.title}</span>
                            <button onClick={onRemoveTaskHandler}>x</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button onClick={onAllFilterButtonHandler}>All</button>
                <button onClick={onActiveFilterButtonHandler}>Active</button>
                <button onClick={onCompletedFilterButtonHandler}>Completed</button>
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