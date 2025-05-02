import { inject, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { NotificationService } from './notification.service';
import {User} from "./interfaces/users.interface";

@Injectable({providedIn: 'root'})
export class UsersService {

    private usersSubject$ = new BehaviorSubject<User[]>([]);
    users$ = this.usersSubject$.asObservable(); // только для чтения, чтобы случайно вне класса UsersService не изменить этот Subject. Потому что изменять Subject мы можем только внутри нашего сервиса.

    private _notificationService: NotificationService = inject(NotificationService);

    setUsers(users: User[]): void {
        this.usersSubject$.next(users)
    }

    editUser(editedUser: User): void {
        this.usersSubject$.next(
            this.usersSubject$.value.map(
                (user: User) => user.id === editedUser.id ? editedUser : user
            )
        )
        this._notificationService.showSuccess("User is successfully edited");
    }

    createUser(user: User): void {
        const existedUser: User | undefined = this.usersSubject$.value.find(
            (currElement: User) => currElement.email === user.email
        )

        if (existedUser !== undefined) {
            alert('Пользователь с таким e-mail уже зарегистрирован')
        } else {
            this.usersSubject$.next([...this.usersSubject$.value, user]);
            this._notificationService.showSuccess("User is successfully created");
        }
    }

    deleteUser(userID: number): void {
        this.usersSubject$.next(
            this.usersSubject$.value.filter(
                (user: User) => user.id !== userID
            )
        )
        this._notificationService.showSuccess("User is successfully deleted");
    }

}
