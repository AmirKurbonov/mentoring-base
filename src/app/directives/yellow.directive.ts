import {Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
  selector: '[yellow]',
  standalone: true
})
export class YellowDirective {

  backgroundColor = 'transparent';
  color = 'white';

  @HostBinding('style.background-color')
  get backgroundColorGetter() {
    return this.backgroundColor;
  }

  @HostBinding('style.color')
  get colorGetter() {
    return this.color;
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.color = 'black';
    this.backgroundColor = 'yellow';
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.color = 'white';
    this.backgroundColor = 'transparent';
  }

}
