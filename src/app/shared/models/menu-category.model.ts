export interface MenuCategoryRequest {
    id: number
    name: string,
    image: File,
    itemCount: number,
}

export interface MenuCategoryResponse {
    id: number
    name: string,
    imageUrl: string,
    itemCount: number,
}