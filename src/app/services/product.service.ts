import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, product } from '../datatype';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  cartData = new EventEmitter<product[] | []>();
  constructor(private http: HttpClient) {}
  addProduct(data: product) {
    return this.http.post('http://localhost:3000/products/', data);
  }
  productList() {
    return this.http.get<product[]>('http://localhost:3000/products/');
  }
  deleteProduct(id: number) {
    return this.http.delete('http://localhost:3000/products/' + id);
  }
  getProduct(id: string) {
    return this.http.get<product>('http://localhost:3000/products/' + id);
  }
  updateProduct(product: product) {
    return this.http.put<product>(
      'http://localhost:3000/products/' + product.id,
      product
    );
  }
  populateProduct() {
    return this.http.get<product[]>('http://localhost:3000/products?_limit=3');
  }
  trendyProducts() {
    return this.http.get<product[]>('http://localhost:3000/products?_limit=4');
  }
  serachProducts(query: string) {
    return this.http.get<product[]>(
      'http://localhost:3000/products?q=' + query
    );
  }
  loacalAddToCart(data: product) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
      this.cartData.emit([data]);
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
      this.cartData.emit(cartData);
    }
  }

  removeFromCart(productId: number) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items = JSON.parse(cartData);
      items = items.filter((item: product) => item.id != productId);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }
  addLocalDataToCart(cartData: cart) {
    console.warn(cartData);
    return this.http.post('http://localhost:3000/cart', cartData);
  }

  getCartList(id: number) {
    this.http
      .get<product[]>('http://localhost:3000/cart?userId=' + id, {
        observe: 'response',
      })
      .subscribe((res) => {
        if (res && res.body) {
          this.cartData.emit(res.body);
        }
      });
  }
  removeFormCart(cartId : number) {
    return this.http.delete('http://localhost:3000/cart/' + cartId);
  }
}
