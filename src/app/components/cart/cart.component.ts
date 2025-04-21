import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartService = inject(CartService);

  incrementQuantity(itemId: number) {
    const item = this.cartService.cartItems().find(i => i.id === itemId);
    if (item) {
      this.cartService.updateQuantity(itemId, item.quantity + 1);
    }
  }

  decrementQuantity(itemId: number) {
    const item = this.cartService.cartItems().find(i => i.id === itemId);
    if (item) {
      this.cartService.updateQuantity(itemId, item.quantity - 1);
    }
  }
}