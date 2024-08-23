import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';
import { TradingCardComponent } from '../../components/trading-card/trading-card.component';
import { ProductListComponent } from '../../components/product-list/product-list.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    NavbarComponent,
    HeaderComponent,
    FooterComponent,
    CommonModule,
    TradingCardComponent,
    ProductListComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  homeCategories: any[] = [];
  merchCategories: any[] = [];
  selectedMerchCategories: any[] = [];
  products: any[] = [];

  constructor(private dataService: DataService, private router: Router) {
    this.dataService.getHomeCategories().subscribe((response: any) => {
      this.homeCategories = response
    })

    // this.dataService.getTradingCards().subscribe((response: any) => {
    //   this.randomTradingCards = response
    // })

    this.dataService.getMerch().subscribe((response: any) => {
      this.products = response
      this.pickRandomMerch(3);
    })

    this.dataService.getMerchCategories().subscribe((response: any) => {
      this.merchCategories = response;
      this.pickRandomCategories(3); // Pick 3 random categories
    });
  }

  pickRandomCategories(count: number) {
    if (Array.isArray(this.merchCategories) && this.merchCategories.length > 0) {
      // Shuffle the array and pick the first 'count' elements
      const shuffled = this.merchCategories.sort(() => 0.5 - Math.random());
      this.selectedMerchCategories = shuffled.slice(0, count);
    }
  }

  pickRandomMerch(count: number) {
    if (Array.isArray(this.products) && this.products.length > 0) {
      // Shuffle the array and pick the first 'count' elements
      const shuffled = this.products.sort(() => 0.5 - Math.random());
      this.products = shuffled.slice(0, count);
    }
  }

  navigateToCategoryPage(categoryId: number) {
    this.router.navigate([`/product-page/${categoryId}`]);
  }

  navigateToDetailPage(productId: number) {
    this.router.navigate([`/product-detail-page/${productId}`]);
  }
}
