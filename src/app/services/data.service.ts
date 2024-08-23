import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getProductImages(): Observable<any[]> {
    return this.http.get<any[]>('assets/json/photos.json')
  }

  getCategoryImages(): Observable<any[]> {
    return this.http.get<any[]>('assets/json/photos.json')
  }

  getHomeBanners(): Observable<any[]> {
    return this.http.get<any[]>('assets/json/photos.json')
  }

  getHomeCategories(): Observable<any[]> {
    return this.http.get<any[]>('assets/json/homeCategories.json')
  }

  getTradingCards(): Observable<any[]> {
    return this.http.get<any[]>('assets/json/tradingCards.json')
  }

  getMerchCategories(): Observable<any[]> {
    return this.http.get<any[]>('https://api.escuelajs.co/api/v1/categories')
  }

  getMerchCategoryById(id: number | null): Observable<any[]> {
    return this.http.get<any[]>(`https://api.escuelajs.co/api/v1/categories/${id}`)
  }

  getMerch(): Observable<any[]> {
    return this.http.get<any[]>(`https://api.escuelajs.co/api/v1/products/`)
  }

  getMerchById(id: number | null = null) {
    return this.http.get<any[]>(`https://api.escuelajs.co/api/v1/products/${id}`)
  }

}
