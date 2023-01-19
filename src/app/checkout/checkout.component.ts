import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { order } from '../datatype';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  constructor(private product: ProductService, private router : Router) {}
  totalPrice: number | undefined;
  ngOnInit(): void {
    this.product.currentCart().subscribe((res) => {
      let price = 0;
      res.forEach((item) => {
        let quantity = 0;
        if (item.quantity) quantity = item.quantity;
        price = price + +item.price * +quantity;
      });
      this.totalPrice = price + price / 20 + 100 - price / 10;
    });
  }
  orderNow(data: { email: string; address: string; contact: string }) {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (this.totalPrice) {
      let orderData: order = {
        ...data,
        totalPrice: this.totalPrice,
        userId,
      };
      this.product.orderNow(orderData).subscribe((res) => {
        if (res) {
          // alert('ok');
          this.router.navigate(['/my-orders']);
        }
      });
    }
  }
}
