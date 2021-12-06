import React, {useState} from 'react';
import './App.css';
import {FilterValueType, TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";


function App() {

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "Css", isDone: true},
        {id: v1(), title: "React", isDone: false},
    ])

    let [filter, setFilter] = useState<FilterValueType>("all")

    const removeTask = (id: string) => {
        let filteredTasks = tasks.filter((task) => task.id !== id)
        setTasks(filteredTasks)
    }

    const addTask = (title: string) => {
        let newTask: TaskType = {
            id: v1(),
            isDone: false,
            title
        }
        let newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }

    const changeFilter = (value: FilterValueType) => {
        setFilter(value)
    }

    const changeTaskStatus = (id: string, isDone: boolean) => {
        let taskToChange = tasks.find((task) => task.id === id)
        if (taskToChange) {
            taskToChange.isDone = isDone
        }
        let copyTasks = [...tasks]
        setTasks(copyTasks)
    }

    let tasksForTodolist = tasks

    if (filter === "completed") {
        tasksForTodolist = tasks.filter((task) => task.isDone === true)
    }
    if (filter === "active") {
        tasksForTodolist = tasks.filter((task) => task.isDone === false)
    }

    return (
        <div className="App">
            <Todolist title={"What to learn"}
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeTaskStatus}
                      filter={filter}
            />
        </div>
    );
}

export default App;
