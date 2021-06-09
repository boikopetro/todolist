import React, {useReducer, useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import {
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todoListsReducer
} from "./state/todolists-reducer";
import {
    addTaskAC,
    addTodoListAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from "./state/tasks-reducer";
import {FilterValuesType} from "./App";

/*
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValuesType = "all" | "completed" | "active";

export type TodoListsTypes = Array<TodoListType>
type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}
*/

function AppWithRedux() {

    const todoListId1 = v1();
    const todoListId2 = v1();

    const [todoLists, dispatchToTodoListsReducer] = useReducer(todoListsReducer, [
        {id: todoListId1, title: "must learn", filter: "all"},
        {id: todoListId2, title: "must buy", filter: "all"},
    ]);

    const [tasksObj, dispatchToTasksReducer] = useReducer(tasksReducer, {
        [todoListId1]: [
            {id: v1(), title: "HTML", isDone: false},
            {id: v1(), title: "CSS", isDone: false},
            {id: v1(), title: "react", isDone: false},
            {id: v1(), title: "redux", isDone: false},
        ],
        [todoListId2]: [
            {id: v1(), title: "car", isDone: false},
            {id: v1(), title: "plane", isDone: false},
        ]
    });

    function deleteTask(id: string, todoListId: string) {
        const action = removeTaskAC(id, todoListId);
        dispatchToTasksReducer(action);
    };

    function addTask(title: string, todoListId: string) {
        const action = addTaskAC(title, todoListId);
        dispatchToTasksReducer(action);
    };

    function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
        const action = changeTaskStatusAC(taskId, isDone, todoListId);
        dispatchToTasksReducer(action);
    };

    function changeTaskTitle(taskId: string, newTitle: string, todoListId: string) {
        const action = changeTaskTitleAC(taskId, newTitle, todoListId);
        dispatchToTasksReducer(action);
    };


    function changeFilter(value: FilterValuesType, todoListId: string) {
        const action = changeTodoListFilterAC(value, todoListId);
        dispatchToTodoListsReducer(action);
    };

    const removeTodoList = (todoListId: string) => {
        const action = removeTodoListAC(todoListId);
        dispatchToTasksReducer(action);
        dispatchToTodoListsReducer(action);
    };

    const changeTodoListTitle = (todListId: string, newTitle: string) => {
        const action = changeTodoListTitleAC(todListId, newTitle);
        dispatchToTodoListsReducer(action);
    };


    const addTodoList = (title: string) => {
       const action = addTodoListAC(title);
       dispatchToTasksReducer(action);
       dispatchToTodoListsReducer(action);
    };


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "30px 0 10px 0"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={10}>
                    {todoLists.map((el) => {
                        debugger;
                        let filteredTasks = tasksObj[el.id];
                        if (el.filter === "completed") {
                            filteredTasks = filteredTasks.filter(t => t.isDone === true)
                        }
                        if (el.filter === "active") {
                            filteredTasks = filteredTasks.filter(t => t.isDone === false)
                        }
                        return <Grid item>
                            <Paper elevation={9} style={{width: "300px", padding: "15px", borderRadius: "10px"}}>
                                <TodoList
                                    key={el.id}
                                    id={el.id}
                                    title={el.title}
                                    tasks={filteredTasks}
                                    deleteTask={deleteTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeStatus}
                                    changeTaskTitle={changeTaskTitle}
                                    filter={el.filter}
                                    removeTodoList={removeTodoList}
                                    changeTodolistTitle={changeTodoListTitle}
                                />
                            </Paper>
                        </Grid>
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
