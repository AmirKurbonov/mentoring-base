import {Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
  selector: '[box-shadow]',
  standalone: true
})
export class BoxShadowDirective {

  boxShadow =  '0px 20px 50px 0px #12112714';

  @HostBinding('style.box-shadow')
  get boxShadowGetter() {
    return this.boxShadow;
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.boxShadow = '0px 20px 50px 0px #12112714';
  }

}
