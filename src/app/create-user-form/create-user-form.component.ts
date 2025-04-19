import { NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogClose } from '@angular/material/dialog';

@Component({
  selector: 'app-create-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, MatDialogClose],
  templateUrl: './create-user-form.component.html',
  styleUrl: './create-user-form.component.scss'
})
export class CreateUserFormComponent {
  
  @Output()
  createUser = new EventEmitter();

  public form: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    website: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    companyName: new FormControl(null, [Validators.required, Validators.minLength(2)]),
  })

  public submitForm(): void {
    this.createUser.emit(this.form.value)
    this.form.reset(); // для очистки формы
  }

  get createUserFields() {
    return {
      id: new Date().getTime(),
      name: this.form.value.name,
      email: this.form.value.email,
      website: this.form.value.website,
      company: {
          name: this.form.value.companyName,
      }
    }
  }

}
