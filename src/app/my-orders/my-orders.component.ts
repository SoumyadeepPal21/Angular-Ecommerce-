import { Component, OnInit } from '@angular/core';
import { order } from '../datatype';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orderData : order[] | undefined;
  constructor(private product : ProductService) { }

  ngOnInit(): void {
    this.product.orderList().subscribe((res)=>{
      console.warn(res);
      
      this.orderData = res;
    });
  }

}
