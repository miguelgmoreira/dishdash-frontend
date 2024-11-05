import { CommonModule, registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { Component, Input, LOCALE_ID } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from '../../models/menu-item.model';
import { ButtonComponent } from '../button/button.component';

registerLocaleData(ptBr);

@Component({
  selector: 'app-menu-item',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.css',
  providers: [{ provide: LOCALE_ID, useValue: 'pt' }],
})
export class MenuItemComponent {
  @Input() item!: MenuItem;

  constructor(private router: Router) {}

  navigateToEdit(): void {
    this.router.navigate(['admin/cardapio/editar', this.item.id])
  }
}
