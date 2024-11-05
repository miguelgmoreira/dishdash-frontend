import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MenuItem } from '../../shared/models/menu-item.model';
import { menuItemMock } from '../mocks/menu-item.mock';

@Injectable({
  providedIn: 'root',
})
export class MenuItemService {
  constructor() {}

  getAll(): Observable<MenuItem[]> {
    const items: MenuItem[] = menuItemMock;

    return of(items);
  }
}
