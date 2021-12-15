import React, {useState} from 'react';
import './App.css';
import {FilterValueType, TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {MenuBook} from "@mui/icons-material";


function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistID1, title: "What to leaRN", filter: "all"},
        {id: todolistID2, title: "What to buy", filter: "completed"},
    ])

    let [allTasks, setAllTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "Css", isDone: true},
            {id: v1(), title: "React", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "Banana", isDone: true},
            {id: v1(), title: "Berry", isDone: false},
            {id: v1(), title: "Icecream", isDone: false},
        ]
    })

    const removeTask = (todolistID: string, taskID: string) => {
        let filteredTasks = allTasks[todolistID].filter((task) => task.id !== taskID)
        setAllTasks({...allTasks, [todolistID]: filteredTasks})
    } // my way 39:38 to fix

    const addTask = (title: string, todolistID: string) => {
        let newTask: TaskType = {
            id: v1(),
            isDone: false,
            title
        }
        let newTasks = [newTask, ...allTasks[todolistID]]
        setAllTasks({...allTasks, [todolistID]: newTasks})
    }// also my way

    const changeFilter = (value: FilterValueType, todolistID: string) => {
        let todolist = todolists.find((tl) => tl.id === todolistID)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }

    const changeTaskStatus = (id: string, isDone: boolean, todolistID: string) => {
        let taskToChange = allTasks[todolistID].find((task) => task.id === id)
        if (taskToChange) {
            taskToChange.isDone = isDone
        }
        setAllTasks({...allTasks})
    }

    const removeTodolist = (id: string) => {
        delete allTasks[id]
        setAllTasks({...allTasks})
        let newTodolists = todolists.filter((tl) => tl.id !== id)
        setTodolists(newTodolists)
    }

    const addTodolist = (title: string) => {
        let todolist: TodolistType = {id: v1(), title: title, filter: "all"}
        setTodolists([todolist, ...todolists])
        setAllTasks({...allTasks, [todolist.id]: []})
    }

    const changeTaskTitle = (todolistID: string, taskID: string, newTitle: string) => {
        let todolist = allTasks[todolistID]
        let task = todolist.find((task) => task.id === taskID)
        if (task) {
            task.title = newTitle
        }
        setAllTasks({...allTasks})
    }

    const changeTodolistTitle = (id: string, newTitle: string) => {
        let todolist = todolists.find((tl) => tl.id === id)
        if (todolist) {
            todolist.title = newTitle
        }
        setTodolists([...todolists])
    }


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
                <Grid container style={{padding : "10px"}}>
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

//TYPES

type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}
export default App;
