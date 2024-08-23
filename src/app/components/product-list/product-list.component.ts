import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TradingCardComponent } from '../trading-card/trading-card.component';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    TradingCardComponent,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnChanges {
  @Input() category: number | null = null;
  categoryName: string = 'Products';
  products: any[] = [];

  constructor(private dataService: DataService, private router: Router) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['category']) {
      this.loadProducts();
    }
  }

  loadProducts() {
    if (this.category === -1) {
      this.dataService.getTradingCards().subscribe((response: any[]) => {
        this.products = response;
      });
    } else {
      this.dataService.getMerch().subscribe((response: any) => {
        if (this.category !== null) {
          this.products = response.filter((product: any) => product.category.id === this.category);
          // get category name
          this.dataService.getMerchCategoryById(this.category).subscribe((response: any) => {
            if (this.category !== null) {
              this.categoryName = response.name
            } else {
              this.categoryName = response;
            }
          });
        } else {
          this.products = response;
        }
      });
    }
  }

  navigateToDetailPage(productId: number) {
    this.router.navigate([`/product-detail-page/${productId}`]);
  }
}
