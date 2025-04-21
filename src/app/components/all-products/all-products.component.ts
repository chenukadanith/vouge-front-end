import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  discount?: number;
  image: string;
  rating: number;
  reviews: number;
  description: string;
  specifications: { key: string; value: string }[];
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css',
})
export class AllProductsComponent {
  searchTerm = signal('');
  quantity = signal(1);

  sortOption = signal('price-low');
  selectedCategory = signal<string | null>(null);
  selectedProduct = signal<Product | null>(null);

  categories = [
    'Processors',
    'Graphics Cards',
    'Motherboards',
    'Memory',
    'Storage',
    'Power Supplies',
    'Cases',
  ];

  products = signal<Product[]>([
    {
      id: 1,
      name: 'Intel Core i9-13900K',
      category: 'Processors',
      price: 589.99,
      discount: 10,
      image: 'https://example.com/cpu1.jpg',
      rating: 5,
      reviews: 142,
      description: '24 cores (8 P-cores + 16 E-cores) and 32 threads. Up to 5.8 GHz Turbo Boost Max 3.0.',
      specifications: [
        { key: 'Cores', value: '24 (8P+16E)' },
        { key: 'Threads', value: '32' },
        { key: 'Max Turbo Frequency', value: '5.8 GHz' }
      ]
    },
    {
      id: 2,
      name: 'Intel Core i9-13900K',
      category: 'Processors',
      price: 589.99,
      discount: 10,
      image: 'https://example.com/cpu1.jpg',
      rating: 5,
      reviews: 142,
      description: '24 cores (8 P-cores + 16 E-cores) and 32 threads. Up to 5.8 GHz Turbo Boost Max 3.0.',
      specifications: [
        { key: 'Cores', value: '24 (8P+16E)' },
        { key: 'Threads', value: '32' },
        { key: 'Max Turbo Frequency', value: '5.8 GHz' }
      ]
    },
    {
      id: 3,
      name: 'Intel Core i9-13900K',
      category: 'Processors',
      price: 589.99,
      discount: 10,
      image: 'https://example.com/cpu1.jpg',
      rating: 5,
      reviews: 142,
      description: '24 cores (8 P-cores + 16 E-cores) and 32 threads. Up to 5.8 GHz Turbo Boost Max 3.0.',
      specifications: [
        { key: 'Cores', value: '24 (8P+16E)' },
        { key: 'Threads', value: '32' },
        { key: 'Max Turbo Frequency', value: '5.8 GHz' }
      ]
    },
    // Add more products...
  ]);

  filteredProducts = signal<Product[]>([]);

  constructor() {
    this.filterProducts();
  }

  filterProducts() {
    let result = this.products();
  
    // Filter by search term
    if (this.searchTerm()) {
      const term = this.searchTerm().toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(term) || 
        p.category.toLowerCase().includes(term)
    );  // Added missing parenthesis
    }
  
    
    // Filter by category
    if (this.selectedCategory()) {
      result = result.filter(p => p.category === this.selectedCategory());
    }
  
    // Sort products
    this.sortProducts(result);
  }

  incrementQuantity() {
    this.quantity.update(current => current + 1);
  }

  decrementQuantity() {
    this.quantity.update(current => Math.max(1, current - 1));
  }


  sortProducts(products: Product[] = this.filteredProducts()) {
    const option = this.sortOption();
    let sorted = [...products]; // Remove the () since products is now the array
  
    switch (option) {
      case 'price-low':
        sorted.sort((a, b) => this.getFinalPrice(a) - this.getFinalPrice(b));
        break;
      // ... other cases
    }
  
    this.filteredProducts.set(sorted);
  }

  filterByCategory(category: string) {
    this.selectedCategory.set(
      this.selectedCategory() === category ? null : category
    );
    this.filterProducts();
  }

  getFinalPrice(product: Product) {
    return product.price - (product.price * (product.discount || 0) / 100);
  }

  quickView(product: Product) {
    this.selectedProduct.set(product);
  }

  addToCart(product: Product) {
    // Implement cart functionality
    console.log('Added to cart:', product);
  }
}