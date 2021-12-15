import React, {ChangeEvent} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

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
                <IconButton onClick={removeTodolist} color={"secondary"}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>

            <div>
                {
                    props.tasks.map((task) => {
                        const onRemoveTaskHandler = () => props.removeTask(props.id, task.id)
                        const onTaskStatusChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)
                        }

                        return <div key={task.id} className={task.isDone ? "completed-task" : ""}>
                            <Checkbox checked={task.isDone}
                                      onChange={onTaskStatusChangeHandler}></Checkbox>
                            <EditableSpan title={task.title}
                                          changeTitle={(title: string) => props.changeTaskTitle(props.id, task.id, title)}/>
                            <IconButton onClick={onRemoveTaskHandler} color={"secondary"}>
                                <Delete/>
                            </IconButton>
                        </div>
                    })
                }
            </div>
            <div>
                <Button color={"primary"}
                        variant={props.filter === "all" ? "outlined" : "text"}
                        onClick={onAllFilterButtonHandler}>All
                </Button>
                <Button className={props.filter === "active" ? "active-filter" : ""}
                        variant={props.filter === "active" ? "outlined" : "text"}
                        onClick={onActiveFilterButtonHandler}>Active
                </Button>
                <Button className={props.filter === "completed" ? "active-filter" : ""}
                        variant={props.filter === "completed" ? "outlined" : "text"}
                        onClick={onCompletedFilterButtonHandler}>Completed
                </Button>
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