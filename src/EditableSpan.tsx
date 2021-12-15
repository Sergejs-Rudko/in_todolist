import React, {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}
export const EditableSpan = (props: EditableSpanPropsType) => {

    let [editMode, setEditMode] = useState<boolean>(false)
    let [title, setTitle] = useState<string>("")

    const onTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const activateEditModeHandler = () => {
        setTitle(props.title)
        setEditMode(true)
    }
    const activateViewMode = () => setEditMode(false)

    const changeTitleOnMouseOutHandler = () => {
        props.changeTitle(title)
        activateViewMode()
    }

    return (
        <>
            {
                editMode ?

                    <TextField
                        variant={"standard"}
                        value={title}
                        autoFocus={true}
                        onBlur={changeTitleOnMouseOutHandler}
                        onChange={onTitleChangeHandler}>
                    </TextField>
                    :
                    <span onDoubleClick={activateEditModeHandler}
                    >{props.title}</span>
            }
        </>
    )
}
