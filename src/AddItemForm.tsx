import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {PlaylistAdd} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    console.log("item")
    const [newTaskTitle, setNewTaskTitle] = useState("");
    let [error, setError] = useState<null | string>(null);
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTaskTitle(e.currentTarget.value);

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (e.charCode === 13) {
            addTaskHandler()
        }
    };

    const addTaskHandler = () => {
        if (newTaskTitle.trim() !== "") {
            props.addItem(newTaskTitle.trim())
        } else {
            setError("Required!!!")
        }
        setNewTaskTitle("");
    };

    return <div>
        <TextField error={!!error}
                   value={newTaskTitle}
                   onChange={onNewTitleChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   variant="outlined"
                   size={"small"}
                   label="add item"
                   helperText={error}
                   onFocus={(e) => {
                       setError(null)
                   }}
        />

        <IconButton onClick={addTaskHandler} color={"primary"}>
            <PlaylistAdd fontSize="large"/>
        </IconButton>
    </div>
});
