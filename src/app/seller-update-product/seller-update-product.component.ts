import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from '../datatype';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css'],
})
export class SellerUpdateProductComponent implements OnInit {
  productData : undefined | product;
  constructor(private route : ActivatedRoute, private productS : ProductService ) {}
  updateProductMessage: string = '';
  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    // this should be same as the route parameter
    // product id can be null or string
    console.warn(productId);
    if (productId) {
      this.productS.getProduct(productId).subscribe((result)=>{
        console.warn(result);
        this.productData = result;
      })
    }
  }
  update(data: product) {}
}
