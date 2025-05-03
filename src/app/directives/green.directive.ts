import {Directive, ElementRef, inject} from "@angular/core";

@Directive({
  selector: '[green]',
  standalone: true
})
export class GreenDirective {

  private readonly elementRef =  inject(ElementRef);

  constructor() {
    this.elementRef.nativeElement.style.backgroundColor = 'green';
  }

}
