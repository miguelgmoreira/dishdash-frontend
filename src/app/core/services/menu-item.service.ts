import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuItemRequest, MenuItemResponse } from '../../shared/models/menu-item.model';

@Injectable({
  providedIn: 'root',
})
export class MenuItemService {
  private baseUrl: string =  "/api/menu-items";

  constructor(private http: HttpClient) {}

  getAll(): Observable<MenuItemResponse[]> {
    return this.http.get<MenuItemResponse[]>(this.baseUrl);
  }
  
  getByCategory(categoryId: number): Observable<MenuItemResponse[]> {
    return this.http.get<MenuItemResponse[]>(`${this.baseUrl}?category_id=${categoryId}`);
  }

  createMenuItem(menuItem: MenuItemRequest): Observable<MenuItemResponse> {
    const formData = new FormData();

    formData.append('name', menuItem.name);
    formData.append('price', menuItem.price.toString());
    formData.append('categoryId', menuItem.categoryId.toString());
    formData.append('description', menuItem.description);
    formData.append('image', menuItem.image, menuItem.image.name);

    return this.http.post<MenuItemResponse>(this.baseUrl, formData);
  }

  updateMenuItem(id: number, menuItem: MenuItemRequest): Observable<MenuItemResponse> {
    const formData = new FormData();
  
    formData.append('name', menuItem.name);
    formData.append('price', menuItem.price.toString());
    formData.append('categoryId', menuItem.categoryId.toString());
    formData.append('description', menuItem.description);
  
    if (menuItem.image) {
      formData.append('image', menuItem.image, menuItem.image.name);
    }
  
    return this.http.put<MenuItemResponse>(`${this.baseUrl}/${id}`, formData);
  }

  deleteMenuItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

}
