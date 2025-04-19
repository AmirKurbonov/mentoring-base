import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Todo } from "./todos-list/todos-list.component";


@Injectable({providedIn: 'root'})
export class TodosService {
    
    private todosSubject$ = new BehaviorSubject<Todo[]>([]);
    todos$ = this.todosSubject$.asObservable();

    setTodos(todos: Todo[]): void {
        this.todosSubject$.next(todos)
    }

    editTodo(editedTodo: Todo): void {
        this.todosSubject$.next(
            this.todosSubject$.value.map(
                todo => todo.id === editedTodo.id ? editedTodo : todo
            )
        )
    }

    createTodo(todo: Todo): void {
        const existingTask: Todo | undefined = this.todosSubject$.value.find(
            (item: Todo) => item.title === todo.title
        )

        if(existingTask !== undefined) {
            alert('Такая задача уже существует')
        } else {
            this.todosSubject$.next([...this.todosSubject$.value, todo])
            alert('Задача успешно добавлена!')
        }
    }

    deleteTodo(id: number): void {
        this.todosSubject$.next(
            this.todosSubject$.value.filter(
                (todo: Todo) => todo.id === id ? false : true
            )
        )
    }

}