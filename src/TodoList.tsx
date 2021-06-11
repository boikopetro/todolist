import React, {useCallback} from "react";
import {FilterValuesType, TaskType} from "./AppWithRedux";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

import DeleteIcon from "@material-ui/icons/Delete";
import {Button, Grid, IconButton} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {addTaskAC} from "./state/tasks-reducer";
import {Task} from "./Task";

type TodoListPropsType = {
    id: string
    title: any
    filter: FilterValuesType
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    removeTodoList: (todListId: string) => void
    changeTodolistTitle: (todListId: string, newTitle: string) => void
}

export const TodoList = React.memo(function (props: TodoListPropsType) {
    console.log("todo")
    const dispatch = useDispatch();
    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(title, props.id))
    }, [dispatch, props.id])

    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.id])


    const filterAllHandler = useCallback(() => props.changeFilter("all", props.id), [props.changeFilter, props.id]);
    const filterCompletedHandler = useCallback(() => props.changeFilter("completed", props.id), [props.changeFilter, props.id]);
    const filterActiveHandler = useCallback(() => props.changeFilter("active", props.id), [props.changeFilter, props.id]);

    const removeTodoList = () => {
        props.removeTodoList(props.id)
    };
    const changeTodolistTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }, [props.changeTodolistTitle, props.id]);

    let filteredTasks = tasks;
    if (props.filter === "completed") {
        filteredTasks = filteredTasks.filter(t => t.isDone === true)
    }
    if (props.filter === "active") {
        filteredTasks = filteredTasks.filter(t => t.isDone === false)
    }

    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodoList}>
                    <DeleteIcon/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                {
                    filteredTasks.map(task => <Task
                        task={task}
                        todoListId={props.id}
                        key={task.id}
                    />)
                }
            </div>
            <Grid>

                <Button variant={"contained"}
                        size={props.filter === "all" ? "small" : "medium"}
                        color={props.filter === "all" ? "primary" : "default"}
                        onClick={filterAllHandler}
                        style={{margin: "3px"}}
                >All

                </Button>

                <Button variant={"contained"}
                        size={props.filter === "active" ? "small" : "medium"}
                        color={props.filter === "active" ? "primary" : "default"}
                        onClick={filterActiveHandler}
                        style={{margin: "3px"}}
                >Active
                </Button>


                <Button variant={"contained"}
                        size={props.filter === "completed" ? "small" : "medium"}
                        color={props.filter === "completed" ? "primary" : "default"}
                        onClick={filterCompletedHandler}
                        style={{margin: "3px"}}
                >Completed
                </Button>

            </Grid>
        </div>
    )
});


export default TodoList;