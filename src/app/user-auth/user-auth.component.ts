import { Component, OnInit } from '@angular/core';
import { cart, login, product, SignUp } from '../datatype';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css'],
})
export class UserAuthComponent implements OnInit {
  constructor(private user: UserService, private product: ProductService) {}
  isLoggedIn: boolean = false;
  authError: string = '';
  ngOnInit(): void {
    this.user.userAuthReload();
  }
  SignUp(val: SignUp) {
    this.user.userSignUp(val);
  }
  LogIn(val: login) {
    this.user.userLogIn(val);
    this.user.invalidUserAuth.subscribe((res) => {
      console.warn(res);
      
      if (res) {
        this.authError = 'Please Enter valid user details';
        console.warn("YO");
      } else {
        this.localCartToRemoteCart();
      }
    });
  }
  openLogIn() {
    this.isLoggedIn = true;
  }
  openSignUp() {
    this.isLoggedIn = false;
  }
  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart');
    if (data) {
      let cartDataList: product[] = JSON.parse(data);
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;
      cartDataList.forEach((product: product, index) => {
        let cartData: cart = {
          ...product,
          productId: product.id,
          userId: userId,
        };
        delete cartData.id;
        setTimeout(() => {
          this.product.addLocalDataToCart(cartData).subscribe((res) => {
            if (res) {
              console.warn('Item stored');
            }
          });
          if (cartDataList.length == index + 1) {
            localStorage.removeItem('localCart');
          }
        }, 500);
      });
    }
  }
}
