import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValuesType = "all" | "completed" | "active"
export type TodoListsTypes = Array<TodoListType>
type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    function deleteTask(id: string, todoListId: string) {
        const tasks = tasksObj[todoListId]
        const filteredTasks = tasks.filter(t => t.id !== id)
        tasksObj[todoListId] = filteredTasks
        setTasksObj({...tasksObj});
    }

    function addTask(title: string, todoListId: string) {
        const task = {id: v1(), title: title, isDone: false};
        const tasks = tasksObj[todoListId];
        const newTasks = [task, ...tasks];
        tasksObj[todoListId] = newTasks;
        setTasksObj({...tasksObj})
    }

    function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
        const tasks = tasksObj[todoListId]
        const task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasksObj({...tasksObj})
        }
    }

    function changeTaskTitle(taskId: string, newTitle: string, todoListId: string) {
        const tasks = tasksObj[todoListId]
        const task = tasks.find(t => t.id === taskId)
        if (task) {
            task.title = newTitle;
            setTasksObj({...tasksObj})
        }
    }

    function changeFilter(value: FilterValuesType, todoListId: string) {
        const todoList = todoLists.find(el => el.id === todoListId)
        if (todoList) {
            todoList.filter = value;
            setTodoLists([...todoLists])

        }
    }

    const todoListId1 = v1();
    const todoListId2 = v1();

    const [todoLists, setTodoLists] = useState<TodoListsTypes>([
        {id: todoListId1, title: "must learn", filter: "all"},
        {id: todoListId2, title: "must buy", filter: "all"}
    ])
    const removeTodoList = (todoListId: string) => {
        const filteredTodoLists = todoLists.filter(el => el.id !== todoListId);
        setTodoLists(filteredTodoLists);
        delete tasksObj[todoListId];
        setTasksObj(tasksObj);
    }

    const changeTodolistTitle = (todListId: string, newTitle: string) => {
        const todoList = todoLists.find(tl => tl.id === todListId)
        if (todoList) {
            todoList.title = newTitle
            setTodoLists([...todoLists])
        }
    }

    const [tasksObj, setTasksObj] = useState<TaskStateType>({
        [todoListId1]: [
            {id: v1(), title: "HTML", isDone: false},
            {id: v1(), title: "CSS", isDone: false},
            {id: v1(), title: "react", isDone: false},
            {id: v1(), title: "redux", isDone: false}
        ],
        [todoListId2]: [
            {id: v1(), title: "car", isDone: false},
            {id: v1(), title: "plane", isDone: false}
        ]
    })

    const addTodoList = (title: string) => {
        let newTodoList: TodoListType = {
            id: v1(),
            title: title,
            filter: "all"
        };
        setTodoLists([newTodoList, ...todoLists])
        setTasksObj({...tasksObj, [newTodoList.id]: []})
    }


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
                <Grid container style={{padding:"30px 0 10px 0"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={10}  >
                    {todoLists.map((el) => {
                        let filteredTasks = tasksObj[el.id];
                        if (el.filter === "completed") {
                            filteredTasks = filteredTasks.filter(t => t.isDone === true)
                        }
                        if (el.filter === "active") {
                            filteredTasks = filteredTasks.filter(t => t.isDone === false)
                        }
                        return <Grid item>
                            <Paper elevation={9} style={{width:"300px",padding:"15px", borderRadius:"10px"}} >
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
                                    changeTodolistTitle={changeTodolistTitle}
                                />
                            </Paper>
                        </Grid>
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
