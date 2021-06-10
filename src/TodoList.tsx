import React, {ChangeEvent} from "react";
import {FilterValuesType, TaskStateType, TaskType} from "./AppWithRedux";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

import DeleteIcon from "@material-ui/icons/Delete";
import {Button, Checkbox, Grid, IconButton} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";

type TodoListPropsType = {
    id: string
    title: any
    filter: FilterValuesType
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    removeTodoList: (todListId: string) => void
    changeTodolistTitle: (todListId: string, newTitle: string) => void

}

function TodoList(props: TodoListPropsType) {
    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.id])
    const dispatch = useDispatch();

    const filterAllHandler = () => props.changeFilter("all", props.id);
    const filterCompletedHandler = () => props.changeFilter("completed", props.id);
    const filterActiveHandler = () => props.changeFilter("active", props.id);
    const removeTodoList = () => {
        props.removeTodoList(props.id)
    };

    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }

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
            <AddItemForm addItem={(title) => {
                dispatch(addTaskAC(title, props.id))
            }
            }/>
            <div>
                {
                    filteredTasks.map(task => {
                        const deleteTaskHandler = () => {
                            dispatch(removeTaskAC(task.id, props.id));
                        }
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked;
                            dispatch(changeTaskStatusAC(task.id, newIsDoneValue, props.id));
                        }
                        const onChangeTitleHandler = (newValue: string) => {
                            dispatch(changeTaskTitleAC(task.id, newValue, props.id))
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
}


export default TodoList