import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { TodosApiService } from "../todos-api.service";
import { AsyncPipe, NgFor } from "@angular/common";
import { TodoCard } from "./todo-card/todo-card.component";
import { TodosService } from "../todos.service";
import { CreateTodoFormComponent } from "../create-todo-form/create-todo-form.component";
import {Todo} from "../interfaces/todos.interface";
import { Store } from "@ngrx/store";
import { TodosActions } from "./store/todo.actions";
import { selectTodos } from "./store/users.selectors";



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
    private readonly store = inject(Store);
    public readonly todos$ = this.store.select(selectTodos);

    constructor(){
        this.apiService.getTodos().subscribe(
            (response: Todo[]) => {
                this.store.dispatch(TodosActions.set({ todos: response}))
            }
        )
    }

    deleteTodo(id: number){
        this.store.dispatch(TodosActions.delete({ id: id }));
    }

    createToDo(formData: Todo) {

        // добавить условие: если такая задача уже существует, то выдаем об этом сообщение и ничего не делаем,
        // если же такой задачи еще нет, тогда создаем. Сравнение осущ-ляем по совпадению title. 

        this.store.dispatch(TodosActions.create({
            todo: {
                userId: formData.userId,
                id: new Date().getTime(),
                title: formData.title,
                completed: formData.completed
            }
        }))
    }

}
