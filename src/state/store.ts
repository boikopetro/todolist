import {combineReducers, createStore} from 'redux'
import {todoListsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";

const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer,
});

export const store = createStore();


// @ts-ignore
window.store = store;

