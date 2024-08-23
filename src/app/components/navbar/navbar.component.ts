import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'] // Corrected property name
})
export class NavbarComponent implements OnInit {
  cartItemCount: number = 0;
  loggedIn: boolean = false;

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    // Check initial login status
    this.loggedIn = this.authService.checkToken();

    // Subscribe to cart updates
    this.cartService.cart$.subscribe(cart => {
      this.cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
