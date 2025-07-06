import { createReducer, on } from "@ngrx/store";
import { Todo } from "../../interfaces/todos.interface";
import { TodosActions } from "./todo.actions";

const initialState: {todos: Todo[]} = {
    todos: [],
};

export const todoReducer = createReducer(
    initialState,
    on(TodosActions.set, (state, payload) => ({
        ...state,
        todos: payload.todos
    })),
    on(TodosActions.edit, (state, payload) => ({
        ...state,
        todos:  state.todos.map((todo: Todo) => (todo.id === payload.todo.id) ? payload.todo : todo)
        }),
    ),
    on(TodosActions.create, (state, { todo }) => ({
    ...state,
    todos: [todo, ...state.todos],
    
    })),
    on(TodosActions.delete, (state, payload) => ({
        ...state,
        todos: state.todos.filter((todo: Todo) => todo.id !== payload.id),
    })),
    on(TodosActions.loadTodosSuccess, (state, payload) => ({
        ...state,
        todos: payload.todos
    })),
);