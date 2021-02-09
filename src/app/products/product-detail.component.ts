import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  pageTitle = 'Product Detail';
  product: IProduct | undefined;
  errorMessage = '';

  constructor(private _route: ActivatedRoute, private _productService: ProductService, private _router: Router) {

   }

  ngOnInit(): void {
    const param = +this._route.snapshot.paramMap.get('id');

    if(param){
      const id = +param;
      this.getProduct(id);
    }
  }

  getProduct(id: number): void {
    this._productService.getProduct(id).subscribe({
      next: product => this.product = product,
      error: err => this.errorMessage = err
    });
  }

  onBack(): void {
    this._router.navigate(['/products']);
  }

}
