import { Component, OnInit } from '@angular/core';
import { product } from '../datatype';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  constructor(private product: ProductService) {}
  popularProduct : undefined | product[];
  ngOnInit(): void {
    this.product.populateProduct().subscribe((data) => {
      console.warn(data);
      this.popularProduct = data;
    });
  }
}
