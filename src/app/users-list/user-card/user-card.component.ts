import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { User } from "../users-list.component";
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle,
  } from '@angular/material/dialog';
import { EditUserDialogComponent } from "../edit-user-dialog/edit-user-dialog.component";

@Component({
    selector: 'app-user-card',
    templateUrl: './user-card.component.html',
    styleUrl: './user-card.component.scss',
    standalone: true
})
export class UserCardComponent {
    @Input()
    user: any

    @Output()
    deleteUser = new EventEmitter()

    @Output()
    editUser = new EventEmitter()

    readonly dialog = inject(MatDialog)


    openDialog(): void {
        const dialogRef = this.dialog.open(EditUserDialogComponent, {
          data: { user: this.user },
        });
    
        dialogRef.afterClosed().subscribe(editResult => {
            console.log('МОДАЛКА ЗАКРЫЛАСЬ, ЗНАЧЕНИЕ ФОРМЫ: ', editResult);
            this.editUser.emit(editResult)
        });
    }

    
    
    onDeleteUser(userID: number) {
        this.deleteUser.emit(userID)
    }
}