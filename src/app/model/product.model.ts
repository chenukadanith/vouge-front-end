// src/app/model/product.model.ts
export interface Product {
    id: number | string;
    name: string;
    price: number;
    description?: string;
    imageUrl: string;
    category: string;
    rating?: number;
    isNew?: boolean;
    isOnSale?: boolean;
    stock?: number;
    oldPrice?: number;
    createdAt?: Date;
    addedToCart?: boolean; // Add this line
  }