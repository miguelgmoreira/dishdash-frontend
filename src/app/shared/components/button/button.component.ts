import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  @Input() btnText: string = "";
  @Input() size: string = "medium";
  @Input() disabled: boolean = false;
  @Input() icon?: string;

  get sizeClass(): string {
    switch (this.size) {
      case 'small':
        return 'text-sm px-3 py-2';
      case 'large':
        return 'text-base px-5 py-3';
      default:
        return 'text-sm px-5 py-2.5';
    }
  }
}
