import React, {useState} from 'react';
import './App.css';
import {FilterValueType, TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";


function App() {


    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistID1, title: "What to leaRN", filter: "all"},
        {id: todolistID2, title: "What to buy", filter: "completed"},
    ])

    let [allTasks, setAllTasks] = useState({
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

    const addTodolist = () => {
        let todolist: TodolistType = {id: v1(), title: "Test", filter: "all"}
        setTodolists([todolist, ...todolists])
        setAllTasks({...allTasks, [todolist.id]: []})
    }


    return (
        <div className="App">
            <div>
                <input/>
                <button onClick={addTodolist}>+ todolist</button>
            </div>
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
                        />
                    )
                })
            }


        </div>
    );
}

//TYPES

type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}
export default App;
