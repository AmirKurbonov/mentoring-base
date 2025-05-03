import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import {YellowDirective} from "../directives/yellow.directive";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgFor, RouterLink, DatePipe, YellowDirective],
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.scss'
})
export class AppHeaderComponent {

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
}
