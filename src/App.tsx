import React from 'react';
import './App.css';
import {FilterValueType, TaskType, Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {MenuBook} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/taskReducer";
import {addTodolistAC, changeFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/todolistReducer";
import {AppRootStateType} from "./state/store";

function App() {
    const dispatch = useDispatch()
    //* STATE-----------------------------------------------------------------------------------------------------------
    let todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    let allTasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    //* FUNCTIONS-------------------------------------------------------------------------------------------------------
    const removeTask = (todolistID: string, taskID: string) => {
        dispatch(removeTaskAC(todolistID, taskID))
    }

    const addTask = (title: string, todolistID: string) => {
        dispatch(addTaskAC(todolistID, title))
    }

    const changeFilter = (value: FilterValueType, todolistID: string) => {
        dispatch(changeFilterAC(todolistID, value))
    }

    const changeTaskStatus = (id: string, isDone: boolean, todolistID: string) => {
        dispatch(changeTaskStatusAC(todolistID, id, isDone))
    }

    const removeTodolist = (id: string) => {
        dispatch(removeTodolistAC(id))
    }

    const addTodolist = (title: string) => {
        dispatch(addTodolistAC(title))
    }

    const changeTaskTitle = (todolistID: string, taskID: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(todolistID, taskID, newTitle))
    }

    const changeTodolistTitle = (id: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC(id, newTitle))
    }

    //* RENDER----------------------------------------------------------------------------------------------------------
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar variant={"dense"}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuBook/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "10px"}}>
                    <AddItemForm addItem={(title: string) => {
                        addTodolist(title)
                    }}/>
                </Grid>
                <Grid container spacing={3}>
                    {

                        todolists.map((tl) => {
                            let tasksForTodolist = allTasks[tl.id]
                            if (tl.filter === "completed") {
                                tasksForTodolist = tasksForTodolist.filter((task) => task.isDone === true)
                            }
                            if (tl.filter === "active") {
                                tasksForTodolist = tasksForTodolist.filter((task) => task.isDone === false)
                            }

                            return (

                                <Grid item>
                                    <Paper style={{padding: "10px"}}>
                                        <Todolist key={tl.id}
                                                  id={tl.id}
                                                  title={tl.title}
                                                  tasks={tasksForTodolist}
                                                  removeTask={removeTask}
                                                  changeFilter={changeFilter}
                                                  addTask={addTask}
                                                  changeTaskStatus={changeTaskStatus}
                                                  filter={tl.filter}
                                                  removeTodolist={removeTodolist}
                                                  changeTaskTitle={changeTaskTitle}
                                                  changeTodolistTitle={changeTodolistTitle}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

//TYPES-----------------------------------------------------------------------------------------------------------------

export type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}
export default App;
