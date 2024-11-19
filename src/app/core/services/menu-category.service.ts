import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuCategoryResponse } from '../../shared/models/menu-category.model';

@Injectable({
  providedIn: 'root',
})
export class MenuCategoryService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<MenuCategoryResponse[]> {
    return this.http.get<MenuCategoryResponse[]>("/api/menu-categories");
  }
}
