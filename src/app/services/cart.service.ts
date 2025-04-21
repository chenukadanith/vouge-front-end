// cart.service.ts
import { Injectable, signal } from '@angular/core';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems = signal<CartItem[]>([]);
  cartTotal = signal<number>(0);
  itemCount = signal<number>(0);

  addToCart(product: CartItem) {
    this.cartItems.update(items => {
      const existingItem = items.find(item => item.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += product.quantity;
        return [...items];
      }
      
      return [...items, product];
    });

    this.updateTotals();
  }

  removeFromCart(itemId: number) {
    this.cartItems.update(items => items.filter(item => item.id !== itemId));
    this.updateTotals();
  }

  updateQuantity(itemId: number, newQuantity: number) {
    this.cartItems.update(items => {
      return items.map(item => {
        if (item.id === itemId) {
          return { ...item, quantity: Math.max(1, newQuantity) };
        }
        return item;
      });
    });
    this.updateTotals();
  }

  clearCart() {
    this.cartItems.set([]);
    this.updateTotals();
  }

  private updateTotals() {
    const items = this.cartItems();
    this.cartTotal.set(
      items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    );
    this.itemCount.set(
      items.reduce((count, item) => count + item.quantity, 0)
    );
  }
}