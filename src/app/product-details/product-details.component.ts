import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from '../datatype';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productData : undefined | product;
  constructor(private activateRoute : ActivatedRoute, private product : ProductService) { }

  ngOnInit(): void {
    let productId = this.activateRoute.snapshot.paramMap.get('productId');
    console.warn(productId);
    productId && this.product.getProduct(productId).subscribe((data)=>{
      console.warn(data);
      this.productData = data;
    })
  }

}
