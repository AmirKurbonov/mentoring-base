import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { EditUser, User } from "../users-list.component";
import { MatDialog } from '@angular/material/dialog';
import { EditUserDialogComponent } from "../edit-user-dialog/edit-user-dialog.component";
import { UserDeleteDialogComponent } from "../user-delete-dialog/user-delete-dialog.component";
import {MatCardModule} from '@angular/material/card';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';

@Component({
    selector: 'app-user-card',
    templateUrl: './user-card.component.html',
    styleUrl: './user-card.component.scss',
    standalone: true,
    imports: [MatCardModule, MatButtonModule]
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
            this.editUser.emit(editResult);
            this.editSnackBar();
        });
    }

    userDeleteDialog(): void {
        const dialogRef = this.dialog.open(UserDeleteDialogComponent);
      
        dialogRef.afterClosed().subscribe((deleteUserInformation: boolean) => {
            console.log('МОДАЛКА ЗАКРЫЛАСЬ, ЗНАЧЕНИЕ ФОРМЫ: ', deleteUserInformation);
            if (deleteUserInformation === true) {
                this.deleteUser.emit(this.user.id);
                this.deleteSnackBar();
            } else return; // проверка: при нажатии мимо модалки, вернуть ничего.
        });
    }

    private _snackBar = inject(MatSnackBar);
    deleteSnackBar() {
        this._snackBar.open("User is successfuly deleted", "OK");
    }
    editSnackBar() {
        this._snackBar.open("User is successfuly edited", "OK");
    }


}