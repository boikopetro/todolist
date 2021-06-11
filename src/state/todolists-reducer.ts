import {FilterValuesType, TodoListsType,} from "../AppWithRedux";
import {v1} from "uuid";

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodoListActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}
export type ChangeTodoListActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    id: string
}
export type ChangeTodoListFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}
type UnionActionType =
    RemoveTodoListActionType
    | AddTodoListActionType
    | ChangeTodoListActionType
    | ChangeTodoListFilterActionType
;

const initialState: TodoListsType = [];

export const todoListsReducer = (state: TodoListsType = initialState, action: UnionActionType): TodoListsType => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [{
                id: action.todolistId,
                title: action.title,
                filter: "all"
            }, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todoList = state.find(el => el.id === action.id)
            if (todoList) {
                todoList.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(el => el.id === action.id)
            if (todolist) {
                todolist.filter = action.filter;
            }
            return [...state]
        }
        default:
            return state;
    }
}

export const removeTodoListAC = (todolistId: string): RemoveTodoListActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const addTodoListAC = (title: string, todolistId: string): AddTodoListActionType => {
    return {type: 'ADD-TODOLIST', title, todolistId}
}
export const changeTodoListTitleAC = (id: string, title: string): ChangeTodoListActionType => {
    return {type: "CHANGE-TODOLIST-TITLE", id: id, title: title}
}
export const changeTodoListFilterAC = (filter: FilterValuesType, id: string): ChangeTodoListFilterActionType => {
    return {type: "CHANGE-TODOLIST-FILTER", filter: filter, id: id}
}