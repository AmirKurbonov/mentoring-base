import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-user-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-user-form.component.html',
  styleUrl: './create-user-form.component.scss'
})
export class CreateUserFormComponent {
  public form = new FormGroup({
    name: new FormControl(),
    email: new FormControl(),
    website: new FormControl(),
    companyName: new FormControl(),
  })

  public createUser(event: Event) {
    event.preventDefault(); // Prevents the default form submission
    console.log('Form submission prevented!');
  }

}
