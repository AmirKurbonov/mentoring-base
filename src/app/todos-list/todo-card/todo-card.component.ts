import { Component, EventEmitter, Input, Output } from "@angular/core";
import {Todo} from "../../interfaces/todos.interface";
import {TitleLimitationPipe}  from "../../pipes/title-limitation.pipe";

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.scss',
  imports: [ TitleLimitationPipe ],
  standalone: true
})
export class TodoCard {

    @Input()
    todo!: Todo

    @Output()
    deleteTodo = new EventEmitter<number>()

    onDeleteTodo(todoID: number){
        this.deleteTodo.emit(todoID)
    }

}
