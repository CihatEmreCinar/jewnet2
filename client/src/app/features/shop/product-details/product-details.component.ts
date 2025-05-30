import { Component, inject } from '@angular/core';
import { ShopService } from '../../../core/services/shop.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../shared/models/product';
import { CurrencyPipe } from '@angular/common';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatDivider, MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-product-details',
  imports: [
    CurrencyPipe,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatLabel,
    MatDividerModule
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  private shopService = inject(ShopService);
  private activatedRoute = inject(ActivatedRoute);
  product?: Product;
  
  ngOnInit(): void {  
    this.loadProduct();
  }
  loadProduct() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(!id) return;
    this.shopService.getProduct(+id).subscribe({
      next: product => this.product = product,
      error:error => console.log(error)
    })
      
  }
}
