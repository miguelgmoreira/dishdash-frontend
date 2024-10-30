import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { MenuItem } from '../../models/menu-item.model';

@Component({
  selector: 'app-menu-item',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.css',
})
export class MenuItemComponent {
  @Input() item!: MenuItem;
}
