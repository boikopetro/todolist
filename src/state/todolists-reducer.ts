import {FilterValuesType, TodoListsTypes} from "../App";
import {v1} from "uuid";

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodoListActionType = {
    type: 'ADD-TODOLIST'
    title: string
}
export type ChangeTodoListActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    id: string
}
export type ChangeTodoListFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    title: string
    filter: FilterValuesType
}
type UnionActionType =
    RemoveTodoListActionType
    | AddTodoListActionType
    | ChangeTodoListActionType
    | ChangeTodoListFilterActionType


export const todolistsReducer = (state: TodoListsTypes, action: UnionActionType): TodoListsTypes => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id != action.id)
        }
        case 'ADD-TODOLIST': {
            return [...state, {
                id: v1(),
                title: action.title,
                filter: "all"
            }]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(el => el.id === action.id)
            if (todolist) {
                todolist.title = action.title;
            }
            return [...state, {
                id: v1(),
                title: action.title,
                filter: "all"
            }]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(el => el.id === action.id)
            if (todolist) {
                todolist.filter = action.filter;
            }
            return [...state, {
                id: v1(),
                title: action.title,
                filter: action.filter
            }]
        }
        default:
            throw new Error("I don't understand this type")
    }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodoListActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const AddTodoListAC = (title: string): AddTodoListActionType => {
    return {type: 'ADD-TODOLIST', title: title}
}
export const ChangeTodoListTitleAC = (id: string, title: string): ChangeTodoListActionType => {
    return {type: "CHANGE-TODOLIST-TITLE", id: id, title: title}
}
export const ChangeTodoListFilterAC = (id: string, title: string, filter: FilterValuesType): ChangeTodoListFilterActionType => {
    return {type: "CHANGE-TODOLIST-FILTER", id: id, filter: filter, title: title}
}