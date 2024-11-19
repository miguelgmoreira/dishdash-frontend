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
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() iconOnly: boolean = false;
  @Input() color: 'blue' | 'red' = 'blue';

  @Output() onClick = new EventEmitter<void>();

  get sizeClass(): string {
    switch (this.size) {
      case 'small':
        return 'text-sm px-3 py-2';
      case 'large':
        return 'text-base px-5 py-3';
      default:
        return 'text-sm px-4 py-3';
    }
  }

  get colorClass(): string {
    if (this.variant === 'outline') {
      return this.color === 'red'
        ? `text-red-600 transition bg-white border-2 border-red-600 hover:bg-red-600 hover:border-transparent hover:text-white`
        : `text-blue-600 transition bg-white border-2 border-blue-600 hover:bg-blue-600 hover:border-transparent hover:text-white`;
    } else {
      return this.color === 'red'
        ? `text-white bg-red-600 hover:bg-red-700 focus:ring-red-300`
        : `text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300`;
    }
  }
}
