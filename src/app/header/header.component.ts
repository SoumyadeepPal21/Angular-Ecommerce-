import { VariableBinding } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  userName: string = '';
  searchResults: undefined | product[];
  cartItems: number = 0;
  constructor(private route: Router, private product: ProductService) {}

  ngOnInit(): void {
    this.route.events.subscribe((result: any) => {
      if (result.url) {
        if (localStorage.getItem('seller') && result.url.includes('seller')) {
          this.menuType = 'seller';
          let selllerStore = localStorage.getItem('seller');
          let sellerData = selllerStore && JSON.parse(selllerStore)[0];
          this.sellerName = sellerData.name;
        } else if (localStorage.getItem('user')) {
          this.menuType = 'user';
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.name;
          console.warn(this.userName);
        } else {
          this.menuType = 'default';
        }
      }
      let cartData = localStorage.getItem('localCart');
      if (cartData) {
        this.cartItems = JSON.parse(cartData).length;
      }
      this.product.cartData.subscribe((res) => {
        this.cartItems = res.length;
      });
    });
  }
  logout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }
  userLogout() {
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth']);
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
  submitSearch(val: string) {
    console.warn(val);
    this.route.navigate(['search/' + val]);
  }
  redirectToDetail(id: number) {
    this.route.navigate(['/details/' + id]);
  }
}
