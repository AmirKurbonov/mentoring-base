import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { User } from "../users-list.component";
import { MatDialog } from '@angular/material/dialog';
import { EditUserDialogComponent } from "../edit-user-dialog/edit-user-dialog.component";
import { UserDeleteDialogComponent } from "../user-delete-dialog/user-delete-dialog.component";
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-user-card',
    templateUrl: './user-card.component.html',
    styleUrl: './user-card.component.scss',
    standalone: true,
    imports: [MatCardModule, MatButtonModule]
})
export class UserCardComponent {

    private readonly dialog = inject(MatDialog)

    @Input()
    user!: User

    @Output()
    deleteUser = new EventEmitter<number>()

    @Output()
    editUser = new EventEmitter<User>()

    openEditDialog(): void {
        const dialogRef = this.dialog.open(EditUserDialogComponent, {
          data: { user: this.user },
        });
    
        dialogRef.afterClosed().subscribe((editResult: User) => {
            console.log('МОДАЛКА ЗАКРЫЛАСЬ, ЗНАЧЕНИЕ ФОРМЫ: ', editResult);
            if (!editResult) return; // проверка: при нажатии мимо модалки, вернуть ничего.
            this.editUser.emit(editResult);
        });
    }

    userDeleteDialog(): void {
        const dialogRef = this.dialog.open(UserDeleteDialogComponent, {
            data: { user: this.user },
          });
      
        dialogRef.afterClosed().subscribe((deleteUserInformation: boolean) => {
            console.log('МОДАЛКА ЗАКРЫЛАСЬ, ЗНАЧЕНИЕ ФОРМЫ: ', deleteUserInformation);
            if (deleteUserInformation === true) {
                this.deleteUser.emit(this.user.id);
            } else return; // проверка: при нажатии мимо модалки, вернуть ничего.
        });
    }


}