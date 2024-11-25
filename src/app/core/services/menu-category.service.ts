import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuCategoryRequest, MenuCategoryResponse } from '../../shared/models/menu-category.model';

@Injectable({
  providedIn: 'root',
})
export class MenuCategoryService {
  private baseUrl: string =  "/api/menu-categories";

  constructor(private http: HttpClient) {}

  getAll(): Observable<MenuCategoryResponse[]> {
    return this.http.get<MenuCategoryResponse[]>("/api/menu-categories");
  }

  createMenuCategory(menuCategory: MenuCategoryRequest): Observable<MenuCategoryResponse> {
    const formData = new FormData();

    formData.append('name', menuCategory.name);
    formData.append('image', menuCategory.image, menuCategory.image.name);

    return this.http.post<MenuCategoryResponse>(this.baseUrl, formData);
  }

  updateMenuCategory(id: number, menuCategory: MenuCategoryRequest): Observable<MenuCategoryResponse> {
    const formData = new FormData();
  
    formData.append('name', menuCategory.name);
  
    if (menuCategory.image) {
      formData.append('image', menuCategory.image, menuCategory.image.name);
    }
  
    return this.http.put<MenuCategoryResponse>(`${this.baseUrl}/${id}`, formData);
  }

  deleteMenuCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
