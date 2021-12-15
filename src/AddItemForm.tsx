import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {AddCircle} from "@mui/icons-material";

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
            <TextField
                variant={"outlined"}
                label={"Type value"}
                value={newTaskTitle}
                onChange={onNewTitleChangeHandler}
                onKeyPress={onEnterKeyPressHandler}
                error={!!error}
                helperText={error ? error : ""}
            ></TextField>

            <IconButton onClick={addTask}
                        color={"primary"}
                        size={"large"}
            >
                <AddCircle/>
            </IconButton>
        </div>
    )
}