import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type PropsType = {
    addItem: (title: string) => void
}
export const AddItemForm = (props: PropsType) => {

    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setNewTaskTitle(e.currentTarget.value)
    }
    const onEnterKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === "Enter") {
            props.addItem(newTaskTitle)
            setNewTaskTitle("")
        }
    }

    const addTask = () => {
        if (newTaskTitle.trim().length > 0) {
            props.addItem(newTaskTitle.trim())
        } else {
            setError("Title required blet")
        }
        setNewTaskTitle("")
    }

    return (
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
    )
}