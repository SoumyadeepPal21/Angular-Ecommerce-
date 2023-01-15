import { ConstantPool } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { product } from '../datatype';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css'],
})
export class SellerUpdateProductComponent implements OnInit {
  productData: undefined | product;
  productUpdateMessgae: undefined | string;
  constructor(
    private route: ActivatedRoute,
    private productS: ProductService,
    private router : Router
  ) {}
  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    // this should be same as the route parameter
    // product id can be null or string
    console.warn(productId);
    if (productId) {
      this.productS.getProduct(productId).subscribe((result) => {
        console.warn(result);
        this.productData = result;
      });
    }
  }
  update(data: product) {
    console.warn(data);
    if (this.productData) {
      data.id = this.productData.id;
    }
    this.productS.updateProduct(data).subscribe((result) => {
      if (result) {
        this.productUpdateMessgae = 'Product has been updated';
      }
    });
    setTimeout(() => {
      this.productUpdateMessgae = undefined;
      this.router.navigate(['seller-home']);
    }, 3000);
  }
}
