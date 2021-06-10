import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import {changeTodoListFilterAC, changeTodoListTitleAC, removeTodoListAC} from "./state/todolists-reducer";
import {addTodoListAC,} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValuesType = "all" | "completed" | "active";

export type TodoListsType = Array<TodoListType>
type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {
    const todoLists = useSelector<AppRootStateType, TodoListsType>(state => state.todoLists)
    const dispatch = useDispatch();

    const removeTodoList = (todoListId: string) => {
        const action = removeTodoListAC(todoListId);
        dispatch(action);
    };

    const changeTodoListTitle = (todListId: string, newTitle: string) => {
        const action = changeTodoListTitleAC(todListId, newTitle);
        dispatch(action);
    };

    function changeFilter(value: FilterValuesType, todoListId: string) {
        const action = changeTodoListFilterAC(value, todoListId);
        dispatch(action);
    };

    const addTodoList = (title: string) => {
        const action = addTodoListAC(title);
        dispatch(action);
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


                        return <Grid item>
                            <Paper elevation={9} style={{width: "300px", padding: "15px", borderRadius: "10px"}}>
                                <TodoList
                                    key={el.id}
                                    id={el.id}
                                    title={el.title}
                                    changeFilter={changeFilter}
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
