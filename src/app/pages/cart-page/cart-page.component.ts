import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  products: any[] = [];
  quantityOptions: number[] = Array.from({ length: 10 }, (_, i) => i + 1);

  constructor(
    private cartService: CartService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.cartService.cart$.subscribe(cart => {
      this.products = cart;
    });
  }

  navigateToDetailPage(productId: number) {
    this.router.navigate([`/product-detail-page/${productId}`]);
  }

  getSubtotal(): number {
    return this.products.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  getTax(): number {
    const subtotal = this.getSubtotal();
    return subtotal * 0.10;
  }

  getTotal(): number {
    return this.getSubtotal() + this.getTax();
  }

  proceedToCheckout() {
    this.router.navigate(['/checkout']);
  }

  removeItem(itemId: number) {
    this.cartService.removeFromCart(itemId);
  }

  updateQuantity(itemId: number, newQuantity: number) {
    const item = this.products.find(product => product.id === itemId);
    if (item) {
      item.quantity = Number(newQuantity);
      this.cartService.addToCart(item, item.quantity); // Correctly update the cart
    }
  }
}
