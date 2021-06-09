import React, {ChangeEvent} from "react";
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

import DeleteIcon from "@material-ui/icons/Delete";
import {Button, Checkbox, Grid, IconButton} from "@material-ui/core";

type TodoListPropsType = {
    id: string
    title: any
    tasks: Array<TaskType>
    filter: FilterValuesType
    deleteTask: (id: string, todoListId: string) => void
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
    removeTodoList: (todListId: string) => void
    changeTodolistTitle: (todListId: string, newTitle: string) => void

}

function TodoList(props: TodoListPropsType) {
    const filterAllHandler = () => props.changeFilter("all", props.id);
    const filterCompletedHandler = () => props.changeFilter("completed", props.id);
    const filterActiveHandler = () => props.changeFilter("active", props.id);
    const removeTodoList = () => {
        props.removeTodoList(props.id);
    };

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
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
                    props.tasks.map(task => {
                        const deleteTaskHandler = () => {
                            props.deleteTask(task.id, props.id)
                        }
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)
                        }
                        const onChangeTitleHandler = (newValue: string) => {
                            props.changeTaskTitle(task.id, newValue, props.id)
                        }
                        return (
                            <div key={task.id} className={task.isDone ? "done" : ""}>
                                <Checkbox
                                    color={"primary"}
                                    onChange={onChangeStatusHandler}
                                    checked={task.isDone}/>
                                <EditableSpan title={task.title} onChange={onChangeTitleHandler}/>
                                <IconButton onClick={deleteTaskHandler}>
                                    <DeleteIcon/>
                                </IconButton>

                            </div>
                        )
                    })
                }
            </div>
            <Grid>

                <Button variant={"contained"}
                        size={props.filter === "all" ? "small" : "medium"}
                        color={props.filter === "all" ? "primary" : "default"}
                        onClick={filterAllHandler}
                        style={{margin:"3px"}}
                >All

                </Button>

                <Button variant={"contained"}
                        size={props.filter === "active" ? "small" : "medium"}
                        color={props.filter === "active" ? "primary" : "default"}
                        onClick={filterActiveHandler}
                        style={{margin:"3px"}}
                >Active
                </Button>


                <Button variant={"contained"}
                        size={props.filter === "completed" ? "small" : "medium"}
                        color={props.filter === "completed" ? "primary" : "default"}
                        onClick={filterCompletedHandler}
                        style={{margin:"3px"}}
                >Completed
                </Button>

            </Grid>
        </div>
    )
}


export default TodoList