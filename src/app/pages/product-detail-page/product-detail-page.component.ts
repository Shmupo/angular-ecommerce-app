import { Component, Input, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ProductReviewComponent } from '../../components/product-review/product-review.component';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-detail-page',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    ProductReviewComponent,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './product-detail-page.component.html',
  styleUrl: './product-detail-page.component.css'
})
export class ProductDetailPageComponent implements OnInit {
  @Input() productId: number | null = 16;
  product: any;
  quantityForm: FormGroup;

  constructor(
    private dataService: DataService, 
    private route: ActivatedRoute, 
    private cartService: CartService,
    private fb: FormBuilder,
  ) {
    this.quantityForm = this.fb.group({
      quantity: new FormControl(1, [Validators.required])
    })
  }

  getQuantity() {
    return this.quantityForm.get('quantity')
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      this.productId = idParam ? +idParam : null;
      
      if (this.productId !== null) {
        this.dataService.getMerchById(this.productId).subscribe((response: any) => {
          this.product = response;
        });
      }
    });
  }

  addToCart() {
    const quantity = this.quantityForm.get('quantity')?.value;
    
    if (this.product && this.productId && quantity > 0) {
      this.cartService.addToCart(this.product, quantity);
    }
  }
}
