import { NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './create-user-form.component.html',
  styleUrl: './create-user-form.component.scss'
})
export class CreateUserFormComponent {
  
  @Output()
  createUser = new EventEmitter();

  public form = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    website: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    companyName: new FormControl(null, [Validators.required, Validators.minLength(2)]),
  })

  public submitForm(): void {
    this.createUser.emit(this.form.value)
    this.form.reset(); // для очистки формы
  }

  // constructor() {
  //   this.form.valueChanges.subscribe((formValue) => {
  //     console.log(this.form.get('name')?.errors)
  //     console.log(formValue)
  //   })
  // }

}
