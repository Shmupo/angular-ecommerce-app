import { Component, Input, OnInit } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ProductListComponent } from '../../components/product-list/product-list.component';
import { CategoryComponent } from '../../components/category/category.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [
    NavbarComponent,
    ProductListComponent,
    CategoryComponent,
    FooterComponent,
  ],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent implements OnInit {
  category: number | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const categoryParam = params.get('category');
      this.category = categoryParam !== null ? parseInt(categoryParam, 10) : null;
      console.log('Category: ' + this.category);
    });
  }
}
