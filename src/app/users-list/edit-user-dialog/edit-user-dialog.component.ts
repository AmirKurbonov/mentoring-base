import { NgIf } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatDialogClose } from '@angular/material/dialog';
import {User} from "../../interfaces/users.interface";



@Component({
    selector: 'app-edit-user-dialog',
    templateUrl: './edit-user-dialog.component.html',
    standalone: true,
    imports: [ReactiveFormsModule, NgIf, MatDialogClose],
})
export class EditUserDialogComponent {

    readonly data = inject<{user: User}>(MAT_DIALOG_DATA);

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
            id: this.data.user.id,
            name: this.form.value.name,
            email: this.form.value.email,
            website: this.form.value.website,
            company: {
                name: this.form.value.companyName
            }
        }
    }

}
