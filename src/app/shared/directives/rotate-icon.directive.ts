import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appRotateIcon]',
  standalone: true,
})
export class RotateIconDirective {
  private isOpen = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('click') onClick() {
    this.isOpen = !this.isOpen;

    const svg = this.el.nativeElement.querySelector('svg, .fa');

    if (svg) {
      if (this.isOpen) {
        this.renderer.addClass(svg, 'rotate-180');
      } else {
        this.renderer.removeClass(svg, 'rotate-180');
      }
    }
  }
}
