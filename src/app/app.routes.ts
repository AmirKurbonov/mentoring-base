import { Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { MainContent } from './main-contant/main-contant.component';
import { TodosListComponent } from './todos-list/todos-list.component';
import { AdminComponent } from './admin/admin.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    {path:'main', component: MainContent},
    {path: 'users-list', component: UsersListComponent},
    {path: '', redirectTo: '/main', pathMatch: 'full'},
    {path: 'todos', component: TodosListComponent},
    {path: 'admin', component: AdminComponent, canActivate: [authGuard]},

];
