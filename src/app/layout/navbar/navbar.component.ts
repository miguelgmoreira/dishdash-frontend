import { Component } from '@angular/core';
import { ToggleDisplayDirective } from '../../shared/directives/toggle-display.directive';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ToggleDisplayDirective],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  toggleSidebar(): void {
    const sidebar = document.getElementById('logo-sidebar');
    if (sidebar) {
      sidebar.classList.toggle('-translate-x-full');
    }
  }
}
