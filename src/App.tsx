import React, {useState} from 'react';
import './App.css';
import {FilterValueType, TaskType, Todolist} from "./Todolist";

function App() {

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "HTML", isDone: true},
        {id: 2, title: "Css", isDone: true},
        {id: 3, title: "React", isDone: false},
        {id: 4, title: "redux", isDone: false},
    ])

    let [filter, setFilter] = useState<FilterValueType>("all")

    const removeTask = (id: number) => {
        let filteredTasks = tasks.filter((task) => task.id !== id)
        setTasks(filteredTasks)
    }

    const changeFilter = (value: FilterValueType) => {
        setFilter(value)
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
            />
        </div>
    );
}

export default App;
