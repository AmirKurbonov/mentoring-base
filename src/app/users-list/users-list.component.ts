import { AsyncPipe, NgFor } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { UserApiService } from "../users-api.service";
import { UserCardComponent } from "./user-card/user-card.component";
import { UsersService } from "../users.service";
import { CreateUserFormComponent } from "../create-user-form/create-user-form.component";


export interface User {
    id: number;
    name: string;
    username?: string; //знак вопроса означает, что это поле - необязательное
    email:  string;
    adress?: {
        street: string;
        suit: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        };
    };
    phone?: string;
    website: string;
    company: {
        name: string;
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


@Component(
    {
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrl: './users-list.component.scss',
    standalone: true,
    imports: [NgFor, UserCardComponent, AsyncPipe, CreateUserFormComponent],
    changeDetection: ChangeDetectionStrategy.OnPush
    }
)

export class UsersListComponent {
    readonly apiService = inject(UserApiService);
    readonly usersService = inject(UsersService);
    

    constructor(){
        this.apiService.getUsers().subscribe(
            (response: User[]) => {
                this.usersService.setUsers(response)
            }
        )

        this.usersService.usersSubject.subscribe(
            users => console.log(this.usersService.usersSubject.value)
        )

        // this.usersService.usersSubject.subscribe(
        //     users => this.users = users
        // )
    }

    deleteUser(id: number){
        this.usersService.deleteUser(id)
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