import {TaskType} from "./AppWithRedux";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import DeleteIcon from "@material-ui/icons/Delete";

type TaskPropsType = {
    task: TaskType
    todoListId: string
}
export const Task = React.memo((props: TaskPropsType) => {
    const dispatch = useDispatch();
    const deleteTaskHandler = () => {
        dispatch(removeTaskAC(props.task.id, props.todoListId));
    }
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        dispatch(changeTaskStatusAC(props.task.id, newIsDoneValue, props.todoListId));
    }
    const onChangeTitleHandler = useCallback((newValue: string) => {
        dispatch(changeTaskTitleAC(props.task.id, newValue, props.todoListId))
    },[props.task.id, props.todoListId]);
    return (
        <div key={props.task.id} className={props.task.isDone ? "done" : ""}>
            <Checkbox
                color={"primary"}
                onChange={onChangeStatusHandler}
                checked={props.task.isDone}/>
            <EditableSpan title={props.task.title} onChange={onChangeTitleHandler}/>
            <IconButton onClick={deleteTaskHandler}>
                <DeleteIcon/>
            </IconButton>
        </div>
    )
});