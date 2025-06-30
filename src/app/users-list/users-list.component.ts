import { AsyncPipe, NgFor } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, OnInit} from "@angular/core";
import { UserApiService } from "../users-api.service";
import { UserCardComponent } from "./user-card/user-card.component";
import { CreateUserFormComponent } from "../create-user-form/create-user-form.component";
import { MatDialog } from '@angular/material/dialog';
import { User } from "../interfaces/users.interface";
import { Store } from "@ngrx/store";
import { UsersActions } from "./store/user.actions";
import { selectUsers } from "./store/users.selectors";
import { NotificationService } from "../notification.service";

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

    private _notificationService: NotificationService = inject(NotificationService);

    private readonly store = inject(Store);

    readonly dialog: MatDialog = inject(MatDialog);

    public readonly users$ = this.store.select(selectUsers);

    ngOnInit(): void {
        this.apiService.getUsers().subscribe(
            (response: User[]) => {
                this.store.dispatch(UsersActions.set({ users: response}))
            }
        )
    }

    editUser(formData: User) {
        this.store.dispatch(UsersActions.edit({ user: formData }));
        this._notificationService.showSuccess("User is successfully edited");
    }

    deleteUser(userID: number) {
        this.store.dispatch(UsersActions.delete({ id: userID }));
        this._notificationService.showSuccess("User is successfully deleted");
    }

    createUser(formData: User) {
        this.store.dispatch(UsersActions.create({ user: formData }));
        this._notificationService.showSuccess("User is successfully created");
    }

    openCreateDialog() {
        const dialogRef = this.dialog.open(CreateUserFormComponent);

        dialogRef.afterClosed().subscribe((createUserFields: User) => {
            if (!createUserFields) return; // проверка: при нажатии мимо модалки, вернуть ничего.
            this.createUser(createUserFields);
        });
    }

}