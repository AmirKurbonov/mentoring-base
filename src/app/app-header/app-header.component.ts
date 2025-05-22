import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import {YellowDirective} from "../directives/yellow.directive";
import { MatDialog } from '@angular/material/dialog';
import { AuthComponent } from '../auth/auth.component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgFor, RouterLink, DatePipe, YellowDirective, AsyncPipe, NgIf],
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.scss'
})
export class AppHeaderComponent {

    private readonly dialog = inject(MatDialog)
    public readonly userService = inject(UserService)

    myDate: Date = new Date();

    nav: string[] = ['Главная','О компании','Каталог'];
    isDelete: boolean = false;
    isToggled: boolean = false;

    deleteCatalog() {
      if (!this.isDelete){
        this.nav = ['Главная','О компании'];
      } else {
        this.nav = ['Главная','О компании','Каталог'];
      }
      this.isDelete = !this.isDelete;
      return this.nav;
    };


    menuItems = ['Каталог', 'Стройматериалы', 'Интсрументы', 'Электрика', 'Интерьер и одежда'];
    isUpperCase = true;

    changeMenuText() {
      this.menuItems = this.menuItems.map(
        item => this.isUpperCase ? item.toLowerCase() : item.toUpperCase()
      );
      this.isUpperCase = !this.isUpperCase;
    }

    public openDialog(): void {
      const dialogRef = this.dialog.open(AuthComponent, {
        width: "400px",
        height: "200px"
      });
  
      dialogRef.afterClosed().subscribe((result: string) => {
        console.log('Результат подписки после Диалог_Окна: ',result);
        (result === 'admin') ? this.userService.loginAsAdmin() : this.userService.loginAsUser();
      });
    }

    public logout() {
      if (confirm("Вы точно хотите выйти?")){
        return this.userService.logout();
      } else return false;
    }
}
