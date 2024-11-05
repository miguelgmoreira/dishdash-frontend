import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MenuCategory } from '../../shared/models/menu-category.model';
import { menuCategoryMock } from '../mocks/menu-category.mock';

@Injectable({
  providedIn: 'root',
})
export class MenuCategoryService {
  constructor() {}

  getAll(): Observable<MenuCategory[]> {
    const categories: MenuCategory[] = menuCategoryMock;

    return of(categories);
  }
}
