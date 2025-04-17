import { inject, Injectable } from "@angular/core";
import { User } from "./users-list/users-list.component";
import { BehaviorSubject } from "rxjs";
import { NotificationService } from './notification.service';

@Injectable({providedIn: 'root'})
export class UsersService {
    usersSubject = new BehaviorSubject<User[]>([]);

    setUsers(users: User[]) {
        this.usersSubject.next(users)
    }

    editUser(editedUser: User) {
        this.usersSubject.next(
            this.usersSubject.value.map(
                (item: User) => item.id === editedUser.id ? editedUser : item
            )
        )
    }


    private _notificationService: NotificationService = inject(NotificationService);

    createUser(user: User) {
        const existedUser = this.usersSubject.value.find(
            (item: User) => item.email === user.email
        )

        if (existedUser !== undefined) {
            alert('Пользователь с таким e-mail уже зарегистрирован')            
        } else {
            this.usersSubject.next([...this.usersSubject.value, user]);
            this._notificationService.showSuccess("User is successfully created");
        }
        
    }

    deleteUser(id: number) {
        this.usersSubject.next(
            this.usersSubject.value.filter(
                (item: User) => item.id === id ? false : true
            )
        )
    }
}