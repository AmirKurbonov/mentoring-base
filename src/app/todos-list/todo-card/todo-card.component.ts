import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Todo } from "../todos-list.component";


@Component({
    selector: 'app-todo-card',
    templateUrl: './todo-card.component.html',
    styleUrl: './todo-card.component.scss',
    standalone: true
})
export class TodoCard {
    
    @Input()
    todo!: Todo

    @Output()
    deleteTodo = new EventEmitter()

    onDeleteTodo(todoID: number){
        this.deleteTodo.emit(todoID)
    }

}