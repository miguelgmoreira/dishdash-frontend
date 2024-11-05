import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

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
  @Input() variant: 'filled' | 'outline' = 'filled';

  @Output() click = new EventEmitter<void>();

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

  get colorClass(): string {
    return this.variant === 'outline'
      ? 'text-blue-600 transition bg-white border-2 border-blue-600 hover:bg-blue-600 hover:border-transparent hover:text-white'
      : 'text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300';
  }
}
