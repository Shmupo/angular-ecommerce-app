import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: any[] = this.loadCartFromLocalStorage();
  private cartSubject = new BehaviorSubject<any[]>(this.cart);

  cart$ = this.cartSubject.asObservable();

  // adds a quantity counter within the entire product info
  addToCart(product: any, quantity: number) {
    const index = this.cart.findIndex(cartItem => cartItem.id === product.id);
    const parsedQuantity = Number(quantity);

    if (index > -1) {
      this.cart[index].quantity = parsedQuantity;
    } else {
      const itemToAdd = { ...product, quantity: parsedQuantity };
      this.cart.push(itemToAdd);
    }

    this.saveCartToLocalStorage();
    this.cartSubject.next(this.cart);
  }

  removeFromCart(itemId: number) {
    this.cart = this.cart.filter(item => item.id !== itemId);
    this.saveCartToLocalStorage();
    this.cartSubject.next(this.cart);
  }

  getCart() {
    return this.cart;
  }

  clearCart() {
    this.cart = [];
    this.saveCartToLocalStorage();
    this.cartSubject.next(this.cart);
  }

  private saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  private loadCartFromLocalStorage(): any[] {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  }
}
