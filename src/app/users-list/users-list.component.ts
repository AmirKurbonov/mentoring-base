import { AsyncPipe, NgFor } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, OnInit} from "@angular/core";
import { UserApiService } from "../users-api.service";
import { UserCardComponent } from "./user-card/user-card.component";
import { UsersService } from "../users.service";
import { CreateUserFormComponent } from "../create-user-form/create-user-form.component";
import { MatDialog } from '@angular/material/dialog';
import { Observable } from "rxjs";


export interface User {
    id: number;
    name: string | undefined;
    username?: string; //знак вопроса означает, что это поле - необязательное
    email:  string | undefined;
    adress?: {
        street: string;
        suit?: string;
        city: string;
        zipcode?: string;
        geo?: {
            lat: string;
            lng: string;
        };
    };
    phone?: string;
    website: string | undefined;
    company: {
        name: string | undefined;
        catchPhrase?: string;
        bs?: string;
    };
}

export interface CreateUser {
    id: number;
    name: string;
    email: string;
    website: string;
    companyName: string;
}

export interface EditUser {
    name?: string;
    email?: string;
    website?: string;
    companyName?: string;
    id: number;
}


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

    deleteUser(id: number) {
        this.usersService.deleteUser(id)
    }

    readonly dialog: MatDialog = inject(MatDialog);

    openCreateDialog() {
        const dialogRef = this.dialog.open(CreateUserFormComponent, {
            data: { user: '' },
        });
      
        dialogRef.afterClosed().subscribe((createUserFields: CreateUser) => {
            console.log('МОДАЛКА ЗАКРЫЛАСЬ, ЗНАЧЕНИЕ ФОРМЫ: ', createUserFields);
            if (!createUserFields) return; // проверка: при нажатии мимо модалки, вернуть ничего.
            this.createUser(createUserFields);
        });
    }

    createUser(formData: CreateUser) {
        this.usersService.createUser({
            id: new Date().getTime(),
            name: formData.name,
            email: formData.email,
            website: formData.website,
            company: {
                name: formData.companyName,
            }
        });
    }

}