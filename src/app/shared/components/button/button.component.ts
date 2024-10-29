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
}
