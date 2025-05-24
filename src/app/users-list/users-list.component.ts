import { AsyncPipe, NgFor } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, OnInit} from "@angular/core";
import { UserApiService } from "../users-api.service";
import { UserCardComponent } from "./user-card/user-card.component";
import { UsersService } from "../users.service";
import { CreateUserFormComponent } from "../create-user-form/create-user-form.component";
import { MatDialog } from '@angular/material/dialog';
import { Observable } from "rxjs";
import { User } from "../interfaces/users.interface";
import { Store } from "@ngrx/store";
import { UsersActions } from "./store/user.actions";
import { selectUsers } from "./store/users.selectors";

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

    private readonly store = inject(Store);

    readonly dialog: MatDialog = inject(MatDialog);

    users$: Observable<User[]> = this.usersService.users$;

    readonly users$_NGRX = this.store.select(selectUsers);

    ngOnInit(): void {
        this.apiService.getUsers().subscribe(
            (response: User[]) => {
                this.usersService.setUsers(response)
                this.store.dispatch(UsersActions.set({ users: response}))
            }
        )
    }

    editUser(formData: User) {
        console.log('получили измененного юзера в Юзер-лист: ', formData);
        this.usersService.editUser(formData);
        this.store.dispatch(UsersActions.edit({ user: formData }));
    }

    deleteUser(userID: number) {
        this.usersService.deleteUser(userID);
        this.store.dispatch(UsersActions.delete({id: userID}));
    }

    createUser(formData: User) {
        this.usersService.createUser(formData);
        this.store.dispatch(UsersActions.create({user: formData}));
    }

    openCreateDialog() {
        const dialogRef = this.dialog.open(CreateUserFormComponent);

        dialogRef.afterClosed().subscribe((createUserFields: User) => {
            console.log('МОДАЛКА ЗАКРЫЛАСЬ, ЗНАЧЕНИЕ ФОРМЫ: ', createUserFields);
            if (!createUserFields) return; // проверка: при нажатии мимо модалки, вернуть ничего.
            this.createUser(createUserFields);
        });
    }

}