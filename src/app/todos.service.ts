import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Todos } from "./todos-list/todos-list.component";


@Injectable({providedIn: 'root'})
export class TodosService {
    todosSubject = new BehaviorSubject<Todos[]>([])

    setTodos(todos: Todos[]) {
        this.todosSubject.next(todos)
    }

    editTodo(editedTodo: Todos){
        this.todosSubject.next(
            this.todosSubject.value.map(
                item => item.id === editedTodo.id ? editedTodo : item
            )
        )
    }

    createTodo(todo: Todos) {
        this.todosSubject.next(
            [...this.todosSubject.value, todo]
        )
    }

    deleteTodo(id: number) {
        this.todosSubject.next(
            this.todosSubject.value.filter(
                item => item.id === id ? false : true
            )
        )
    }

}