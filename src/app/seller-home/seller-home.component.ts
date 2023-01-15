import { Component, OnInit } from '@angular/core';
import { product } from '../datatype';
import { ProductService } from '../services/product.service';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css'],
})
export class SellerHomeComponent implements OnInit {
  productList: undefined | product[];
  productDeleteMessage: undefined | string;
  iconDelete = faTrash;
  iconEdit = faEdit;
  constructor(private product: ProductService) {}

  ngOnInit(): void {
    this.listAllProducts();
  }
  deleteProduct(id: number) {
    this.product.deleteProduct(id).subscribe((result) => {
      if (result) {
        this.productDeleteMessage = 'Product successfully deleted';
        this.listAllProducts();
      }
    });

    setTimeout(() => {
      this.productDeleteMessage = undefined;
    }, 3000);
  }

  listAllProducts() {
    this.product.productList().subscribe((result) => {
      // console.warn(result);
      this.productList = result;
    });
  }
}
