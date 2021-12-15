import React, {ChangeEvent, useState} from "react";

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
                    <input value={title}
                           autoFocus={true}
                           onMouseOut={changeTitleOnMouseOutHandler}
                           onChange={onTitleChangeHandler}
                    />
                    :
                    <span onDoubleClick={activateEditModeHandler}
                    >{props.title}</span>
            }
        </>
    )
}
