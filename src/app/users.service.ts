import { inject, Injectable } from "@angular/core";
import { User } from "./users-list/users-list.component";
import { BehaviorSubject } from "rxjs";
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({providedIn: 'root'})
export class UsersService {
    usersSubject = new BehaviorSubject<User[]>([]);

    setUsers(users: User[]) {
        this.usersSubject.next(users)
    }

    editUser(editedUser: User) {
        this.usersSubject.next(
            this.usersSubject.value.map(
                item => item.id === editedUser.id ? editedUser : item
            )
        )
    }

    private _snackBar = inject(MatSnackBar);
    createSnackBar() {
        this._snackBar.open("User is successfuly created", "OK");
    }

    createUser(user: User) {
        const existedUser = this.usersSubject.value.find(
            item => item.email === user.email
        )

        if (existedUser !== undefined) {
            alert('Пользователь с таким e-mail уже зарегистрирован')            
        } else {
            this.usersSubject.next([...this.usersSubject.value, user]);
            this.createSnackBar();
        }
        
        //три точки это rest оператор, который позволяет добавлять в массив users нового созданного user.
        // this.users = this.users.concat([user]); Метод concat объединяет два массива в один: [users] + [user] = [users, user]. Это просто второй способ добавлять в массив какой-то новый элемент (перезаписывать его!!).
        // this.users.push(user); Так неправильно делать, потому что этот способ мутирует массив (изменяет его), но не перезаписывает. 
        // А нам надо, чтобы он перезаписывался.
        // Это влияет на скорость работы приложения (разговор про changeDetection) 
        // и фиксирование изменений (то есть ангуляр не будет видить, что мы что-то изменили в массиве (разговор про реактивность, а также про ссылки)
    }

    deleteUser(id: number) {
        this.usersSubject.next(
            this.usersSubject.value.filter(
                item => item.id === id ? false : true
            )
        )
    }
}