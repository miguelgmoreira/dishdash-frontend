import { CommonModule, registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { Component, EventEmitter, Input, LOCALE_ID, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItemResponse } from '../../models/menu-item.model';
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
  @Output() onClick = new EventEmitter<any>();
  @Input() item!: MenuItemResponse;

  constructor(private router: Router) {}

}
