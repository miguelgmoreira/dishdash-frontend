import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appToggleDisplay]',
  standalone: true
})
export class ToggleDisplayDirective {
  @Input('appToggleDisplay') targetElementId!: string;

  @HostListener('click') onClick() {
    const targetElement = document.getElementById(this.targetElementId);
    if (targetElement) {
      targetElement.classList.toggle("hidden")
    }
  }
}
