import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-todo-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-todo-form.component.html',
  styleUrl: './create-todo-form.component.scss'
})
export class CreateTodoFormComponent {

  @Output()
  createToDo = new EventEmitter();


  public form = new FormGroup({
    user-id: new FormControl(null, [Validators.required]),
    id: new FormControl(null, [Validators.required]),
    title: new FormControl(null, [Validators.required]),
  })

  public submitForm(): void {
    this.createToDo.emit(this.form.value)
  }

}
