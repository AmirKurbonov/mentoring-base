import {Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
  selector: '[green]',
  standalone: true
})
export class GreenDirective {

  // private readonly elementRef =  inject(ElementRef);
  //
  // constructor() {
  //   this.elementRef.nativeElement.style.backgroundColor = 'green';
  // }

  color =  'green';
  textTransform = 'lowercase';

  @HostBinding('style.background-color')
  get backgroundColor() {
    return this.color;
  }

  @HostBinding('style.text-transform')
  get textTransformGetter() {
    return this.textTransform;
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.color = 'pink';
    this.textTransform = 'uppercase';
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.color = 'white';
    this.textTransform = 'lowercase';
  }



}
