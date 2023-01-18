import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from '../datatype';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  productData: undefined | product;
  productQuantity: number = 1;
  removeCart = false;
  constructor(
    private activateRoute: ActivatedRoute,
    private product: ProductService
  ) {}

  ngOnInit(): void {
    let productId = this.activateRoute.snapshot.paramMap.get('productId');
    // console.warn(productId);
    productId &&
      this.product.getProduct(productId).subscribe((data) => {
        // console.warn(data);
        this.productData = data;
      });
    let cartData = localStorage.getItem('localCart');
    if (productId && cartData) {
      let items = JSON.parse(cartData);
      items = items.filter((item: product) => productId == item.id.toString());
      if (items.length) {
        this.removeCart = true;
      } else {
        this.removeCart = false;
      }
    }
  }
  adjustQuantity(val: string) {
    if (val == '+') {
      if (this.productQuantity < 20) {
        this.productQuantity += 1;
      }
    } else {
      if (this.productQuantity > 1) {
        this.productQuantity -= 1;
      }
    }
  }
  addToCart() {
    console.warn(this.productData);
    if (this.productData) {
      this.productData.quantity = this.productQuantity;
      if (!localStorage.getItem('user')) {
        this.product.loacalAddToCart(this.productData);
        this.removeCart = true;
      } else {
        console.warn('else');
      }
    }
  }
  removeFromCart(productId : number) {
    this.product.removeFromCart(productId);
    this.removeCart = false;
  }
}
