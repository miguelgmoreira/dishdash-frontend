import { MenuCategoryResponse } from "./menu-category.model";

export interface MenuItemRequest {
    name: string;
    description: string;
    price: number;
    discountedPrice?: number;
    image: File;
    categoryId: number;
  }
  
  export interface MenuItemResponse {
    id: number;
    name: string;
    description: string;
    price: number;
    discountedPrice?: number;
    imageUrl: string;
    category: MenuCategoryResponse;
  }