import { AsyncPipe, NgFor } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, OnInit} from "@angular/core";
import { UserApiService } from "../users-api.service";
import { UserCardComponent } from "./user-card/user-card.component";
import { UsersService } from "../users.service";
import { CreateUserFormComponent } from "../create-user-form/create-user-form.component";
import { MatDialog } from '@angular/material/dialog';
import { Observable } from "rxjs";
import { User } from "../interfaces/users.interface";




@Component(
    {
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrl: './users-list.component.scss',
    standalone: true,
    imports: [NgFor, UserCardComponent, AsyncPipe],
    changeDetection: ChangeDetectionStrategy.OnPush
    }
)
export class UsersListComponent implements OnInit {

    readonly apiService = inject(UserApiService);

    private readonly usersService = inject(UsersService);

    users$: Observable<User[]> = this.usersService.users$;

    readonly dialog: MatDialog = inject(MatDialog);

    ngOnInit(): void {
        this.apiService.getUsers().subscribe(
            (response: User[]) => {
                this.usersService.setUsers(response)
            }
        )
    }

    editUser(formData: User) {
        this.usersService.editUser(formData)
    }

    deleteUser(userID: number) {
        this.usersService.deleteUser(userID)
    }

    createUser(formData: User) {
        this.usersService.createUser(formData);
    }

    openCreateDialog() {
        const dialogRef = this.dialog.open(CreateUserFormComponent, {
            data: { user: '' },
        });
      
        dialogRef.afterClosed().subscribe((createUserFields: User) => {
            console.log('МОДАЛКА ЗАКРЫЛАСЬ, ЗНАЧЕНИЕ ФОРМЫ: ', createUserFields);
            if (!createUserFields) return; // проверка: при нажатии мимо модалки, вернуть ничего.
            this.createUser(createUserFields);
        });
    }

}

export { User };
