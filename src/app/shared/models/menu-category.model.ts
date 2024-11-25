export interface MenuCategoryRequest {
    name: string,
    image: File,
}

export interface MenuCategoryResponse {
    id: number
    name: string,
    imageUrl: string,
    itemCount: number,
}