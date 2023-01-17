import { VariableBinding } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { product } from '../datatype';
import { ProductService } from '../services/product.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  menuType: string = 'default';
  sellerName: string = '';
  searchResults: undefined | product[];
  constructor(private route: Router, private product: ProductService) {}

  ngOnInit(): void {
    this.route.events.subscribe((result: any) => {
      if (result.url) {
        if (localStorage.getItem('seller') && result.url.includes('seller')) {
          // console.warn("in seller");
          this.menuType = 'seller';
          if (localStorage.getItem('seller')) {
            let selllerStore = localStorage.getItem('seller');
            let sellerData = selllerStore && JSON.parse(selllerStore)[0];
            this.sellerName = sellerData.name;
          }
        } else {
          // console.warn("outside seller");
          this.menuType = 'default';
        }
      }
    });
  }
  logout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }

  searchProducts(query: KeyboardEvent) {
    if (query) {
      const item = query.target as HTMLInputElement;
      // console.warn(item.value);
      this.product.serachProducts(item.value).subscribe((data) => {
        if (data.length > 5) {
          data.length = 5;
        }
        this.searchResults = data;
        // console.warn(data);
      });
    }
  }
  hideSearch() {
    this.searchResults = undefined;
  }
  submitSearch(val : string) {
    console.warn(val);
    this.route.navigate(['search/' + val]);
  }
}
