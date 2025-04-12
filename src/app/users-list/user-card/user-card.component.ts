import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { EditUser, User } from "../users-list.component";
import {
    MatDialog,
  } from '@angular/material/dialog';
import { EditUserDialogComponent } from "../edit-user-dialog/edit-user-dialog.component";
import { CreateUserFormComponent } from "../../create-user-form/create-user-form.component";

@Component({
    selector: 'app-user-card',
    templateUrl: './user-card.component.html',
    styleUrl: './user-card.component.scss',
    standalone: true
})
export class UserCardComponent {
    @Input()
    user!: User

    @Output()
    deleteUser = new EventEmitter()

    @Output()
    editUser = new EventEmitter()

    readonly dialog = inject(MatDialog)


    openEditDialog(): void {
        const dialogRef = this.dialog.open(EditUserDialogComponent, {
          data: { user: this.user },
        });
    
        dialogRef.afterClosed().subscribe((editResult: EditUser) => {
            console.log('МОДАЛКА ЗАКРЫЛАСЬ, ЗНАЧЕНИЕ ФОРМЫ: ', editResult);
            if (!editResult) return; // проверка: при нажатии мимо модалки, вернуть ничего.
            this.editUser.emit(editResult)
        });
    }

    

    

    
    
    onDeleteUser(userID: number) {
        this.deleteUser.emit(userID)
    }
}