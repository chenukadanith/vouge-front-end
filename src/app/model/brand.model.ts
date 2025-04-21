// src/app/models/brand.model.ts
export interface Brand {
    id: number;
    name: string;
    logo: string; // Path to image
    website?: string; // Optional website URL
  }