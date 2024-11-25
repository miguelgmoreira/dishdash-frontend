import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RotateIconDirective } from '../../shared/directives/rotate-icon.directive';
import { ToggleDisplayDirective } from '../../shared/directives/toggle-display.directive';

interface SidebarItem {
  label: string;
  route?: string;
  icon?: string;
  toggleElementId?: string;
  subItems?: SidebarItem[];
  isButton?: boolean;
  action?: () => void;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, ToggleDisplayDirective, RotateIconDirective],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  sidebarItems: SidebarItem[] = [
    {
      label: 'Gerenciar cardápio',
      icon: 'store',
      route: '/gerenciar-cardapio',
    }
  ];
}
