import { NgIf } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

export function completedValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value?.trim().toLowerCase();
    if (value === 'да' || value === 'нет') {
      return null;
    } 
    return { invalidCompleted: true};
  };
}


@Component({
  selector: 'app-create-todo-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, MatButtonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconButton, MatIconModule], 
  templateUrl: './create-todo-form.component.html',
  styleUrl: './create-todo-form.component.scss'
})
export class CreateTodoFormComponent {

  private readonly formBuilder: FormBuilder = inject(FormBuilder);

  @Output()
  createToDo = new EventEmitter();

  public formTodo = this.formBuilder.group({
    userID: ['', Validators.required, Validators.minLength(2)],
    title: ['', Validators.required, Validators.minLength(3)],
    completed: ['', Validators.required, completedValidator()]
  });

  private getCompletedValue(): boolean {
    const value = this.formTodo.get('completed')?.value!.trim().toLowerCase();
    return value === 'да';
  }

  public submitForm(): void {
    this.createToDo.emit({...this.formTodo.value, completed: this.getCompletedValue()});
    this.formTodo.reset(); // для очистки формы
  }

}
