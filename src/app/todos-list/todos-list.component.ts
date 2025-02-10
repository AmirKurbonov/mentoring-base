import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { TodosApiService } from "../todos-api.service";
import { AsyncPipe, NgFor } from "@angular/common";
import { TodoCard } from "./todo-card/todo-card.component";
import { TodosService } from "../todos.service";
import { CreateTodoFormComponent } from "../create-todo-form/create-todo-form.component";


export interface Todos {
    userId: number;
    id: number;
    title: string;
    completed?: boolean;
}

@Component({
    selector: 'app-todos-list',
    templateUrl: './todos-list.component.html',
    styleUrl: './todos-list.component.scss',
    standalone: true,
    imports: [NgFor, TodoCard, AsyncPipe, CreateTodoFormComponent],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class TodosListComponent {
    readonly apiService = inject(TodosApiService)
    readonly todosService = inject(TodosService)

    constructor(){
        this.apiService.getTodos().subscribe(
            (response: Todos[]) => {
                this.todosService.setTodos(response)
            }
        )
    }

    deleteTodo(id: number){
        this.todosService.deleteTodo(id)
    }

    createToDo(formData: Todos) {
        this.todosService.createTodo({
            userId: formData.userId,
            id: new Date().getTime(),
            title: formData.title,
            completed: formData.completed
        })
    }

}