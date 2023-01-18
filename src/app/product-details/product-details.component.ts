import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { cart, product } from '../datatype';
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
    productId &&
      this.product.getProduct(productId).subscribe((data) => {
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
    let user = localStorage.getItem('user');
    if (user) {
      let userId = user && JSON.parse(user).id;
      this.product.getCartList(userId);
      this.product.cartData.subscribe((res)=>{
        let items = res.filter((item : product)=>productId?.toString() === item.productId?.toString());
        console.warn("items " + items.length);
        
        if (items.length) {
          this.removeCart = true;
        }
      })
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
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        console.warn(userId);
        let cartData: cart = {
          ...this.productData,
          userId: userId,
          productId: this.productData.id,
        };
        delete cartData.id;
        console.warn(cartData);
        this.product.addLocalDataToCart(cartData).subscribe((res) => {
          if (res) {
            this.product.getCartList(userId);
            this.removeCart = true;
          }
        });
      }
    }
  }
  removeFromCart(productId: number) {
    this.product.removeFromCart(productId);
    this.removeCart = false;
  }
}
