import { createAction, createActionGroup, emptyProps, props } from "@ngrx/store";
import { User } from "../../interfaces/users.interface";

export const UsersActions = createActionGroup({
    source: 'Users',
    events: {
        'set': props<{ users: User[] }>(),
        'edit': props<{ user: User }>(),
        'create': props<{ user: User }>(),
        'delete': props<{ id: number }>(),
        'loadUsers': emptyProps(),
        'loadUsersSuccess': props<{ users: User[] }>(),
        'loadUsersFailure': props<{ error: string }>(),
    }
})
