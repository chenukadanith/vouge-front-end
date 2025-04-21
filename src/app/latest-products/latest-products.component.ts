// src/app/components/latest-products/latest-products.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../model/product.model'; // Adjusted path

@Component({
  selector: 'app-latest-products',
  templateUrl: './latest-products.component.html',
  styleUrls: ['./latest-products.component.css'],
  standalone: true, // Add if using standalone components
  imports: [CommonModule] // Required for pipes
})
export class LatestProductsComponent {
  @Output() addToCartEvent = new EventEmitter<Product>();

  title = 'Latest Products';
  subtitle = 'Discover our newest arrivals';
  itemsToShow = 4;

  // Using intersection type for temporary property
  products: (Product & { addedToCart?: boolean })[] = [
    {
      id: 1,
      name: 'Wireless Bluetooth Headphones',
      price: 99.99,
      oldPrice: 129.99,
      imageUrl: 'assets/products/headphones.png',
      category: 'Electronics',
      rating: 4.5,
      isNew: true,
      isOnSale: true,
      stock: 15,
      addedToCart: false // Initialize here
    },
    {
      id: 2,
      name: 'Wireless Bluetooth Headphones',
      price: 99.99,
      oldPrice: 129.99,
      imageUrl: 'assets/products/headphones.png',
      category: 'Electronics',
      rating: 4.5,
      isNew: true,
      isOnSale: true,
      stock: 15,
      addedToCart: false // Initialize here
    }, {
      id: 3,
      name: 'Wireless Bluetooth Headphones',
      price: 99.99,
      oldPrice: 129.99,
      imageUrl: 'assets/products/headphones.png',
      category: 'Electronics',
      rating: 4.5,
      isNew: true,
      isOnSale: true,
      stock: 15,
      addedToCart: false // Initialize here
    },
    {
      id: 4,
      name: 'Wireless Bluetooth Headphones',
      price: 99.99,
      oldPrice: 129.99,
      imageUrl: 'assets/products/headphones.png',
      category: 'Electronics',
      rating: 4.5,
      isNew: true,
      isOnSale: true,
      stock: 15,
      addedToCart: false // Initialize here
    },
    // ... other products with addedToCart: false
  ];

  get visibleProducts(): (Product & { addedToCart?: boolean })[] {
    return this.products.slice(0, this.itemsToShow);
  }

  addToCart(product: Product & { addedToCart?: boolean }): void {
    if (product.stock && product.stock > 0) {
      this.addToCartEvent.emit(product);
      product.addedToCart = true;
      setTimeout(() => product.addedToCart = false, 2000);
    }
  }

  getDiscountPercentage(product: Product): number {
    if (!product.oldPrice) return 0;
    return Math.round((product.oldPrice - product.price) / product.oldPrice * 100);
  }
}