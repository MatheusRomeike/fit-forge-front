import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[fullSize]',
})
export class FullSizeDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.renderer.addClass(this.el.nativeElement, 'w-svw');
    this.renderer.addClass(this.el.nativeElement, 'h-svh');
  }
}
