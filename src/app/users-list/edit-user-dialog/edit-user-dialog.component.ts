import { NgIf } from "@angular/common";
import { Component, inject, model } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatDialogClose } from '@angular/material/dialog';
import { CreateUser, EditUser, User } from "../users-list.component";



@Component({
    selector: 'app-edit-user-dialog',
    templateUrl: './edit-user-dialog.component.html',
    standalone: true,
    imports: [ReactiveFormsModule, NgIf, MatDialogClose],
})
export class EditUserDialogComponent {
    
    readonly data = inject<{user: User}>(MAT_DIALOG_DATA);

    constructor() {
        console.log('DATA: ', this.data);
    }

    public form = new FormGroup({
        name: new FormControl(this.data.user.name, [Validators.required, Validators.minLength(2)]),
        email: new FormControl(this.data.user.email, [Validators.required, Validators.email]),
        website: new FormControl(this.data.user.website, [Validators.required, Validators.minLength(3)]),
        companyName: new FormControl(this.data.user.company.name, [Validators.required, Validators.minLength(2)]),
    })


    // гетер нужен во-первых для добавления id юзера (это чтобы редактировать его по id)
    // во-вторых к гетеру можно обращаться как к полю, хотя он является методом 
    // (это чтобы добавлять какие-либо данные к имеющимся (например id к данным формы) и передавать их как единый объект)
    get userWithUpdatedFields() {
        return {
            ...this.form.value,
            id: this.data.user.id,
        }
    }
    
}