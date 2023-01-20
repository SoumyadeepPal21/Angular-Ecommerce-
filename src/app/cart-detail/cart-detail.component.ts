import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cart, priceSummary } from '../datatype';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.css'],
})
export class CartDetailComponent implements OnInit {
  cartData: undefined | cart[];
  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    delivery: 0,
    total: 0,
    tax: 0,
  };
  constructor(private product: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadDetails();
  }
  loadDetails() {
    this.product.currentCart().subscribe((res) => {
      this.cartData = res;
      let price = 0;
      res.forEach((item) => {
        let quantity = 0;
        if (item.quantity) quantity = item.quantity;
        price = price + +item.price * +quantity;
      });
      console.warn(price);
      this.priceSummary.price = price;
      this.priceSummary.discount = price / 10;
      this.priceSummary.tax = price / 20;
      this.priceSummary.delivery = 100;
      this.priceSummary.total =
        this.priceSummary.price +
        this.priceSummary.tax +
        this.priceSummary.delivery -
        this.priceSummary.discount;
        if (!this.cartData.length) {
          this.router.navigate(['/']);
        }
    });
  }
  checkout() {
    this.router.navigate(['/checkout']);
  }
  removeToCart(cartId: number | undefined) {
    cartId &&
      this.cartData &&
      this.product.removeFormCart(cartId).subscribe((res) => {
        this.loadDetails();
      });
  }
}
