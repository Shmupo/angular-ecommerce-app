import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit {
  products: any[] = [];
  isCartEmpty: boolean = false;
  message: string = 'Click below to finalize your purchase.';

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.products = this.cartService.getCart();
    this.isCartEmpty = this.products.length === 0;
  }

  purchaseButtonHandler() {
    this.cartService.clearCart();
    this.products = this.cartService.getCart();
    
    if (this.products.length === 0) {
      this.isCartEmpty = true;
      this.message = 'Thank you for your purchase! Your cart is now empty.';
    } else {
      this.isCartEmpty = false;
      this.message = 'Click below to finalize your purchase.';
    }
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
}