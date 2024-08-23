import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private cartService: CartService) { }

  register(data: any): Observable<any> {
    return this.http.post('', data)
  }

  login(data: any): Observable<any> {
    return this.http.post('https://api.escuelajs.co/api/v1/auth/login', data)
  }

  getProfile(data: any): Observable<any> {
    return this.http.get('https://api.escuelajs.co/api/v1/auth/profile', data)
  }

  checkToken(): boolean {
    if(localStorage.getItem('token')) {
      return true
    }
    else return false
  }

  logout() {
    localStorage.removeItem('token');
    this.cartService.clearCart()
  }
}