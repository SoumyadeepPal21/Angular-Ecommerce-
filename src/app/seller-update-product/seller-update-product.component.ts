import { Component, OnInit } from '@angular/core';
import { product } from '../datatype';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css'],
})
export class SellerUpdateProductComponent implements OnInit {
  constructor() {}
  updateProductMessage: string = '';
  ngOnInit(): void {}
  update(data: product) {}
}
