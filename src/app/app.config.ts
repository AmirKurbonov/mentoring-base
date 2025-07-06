import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { userReducer } from './users-list/store/users.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { todoReducer } from './todos-list/store/todos.reducer';
import { provideEffects } from '@ngrx/effects';
import { TodosEffects } from './todos-list/store/todos.effects';
import { UsersEffects } from './users-list/store/users.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(), provideAnimationsAsync(),
    provideStore({
        users: userReducer,
        todos: todoReducer,
    }),
    provideEffects(UsersEffects, TodosEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
]
};
