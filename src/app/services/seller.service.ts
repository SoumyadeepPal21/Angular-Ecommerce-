import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { login, SignUp } from '../datatype';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class SellerService {
  isLogInError = new EventEmitter<boolean>(false);
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient, private router: Router) {}
  userSignUp(data: SignUp) {
    this.http
      .post('http://localhost:3000/seller', data, { observe: 'response' })
      .subscribe((result) => {
        // this.isSellerLoggedIn.next(true);
        // localStorage.setItem('seller', JSON.stringify(result.body));
        // this.router.navigate(['seller-home']);
        console.warn(data);
        localStorage.setItem('seller', JSON.stringify(result.body));
        this.router.navigate(['seller-home']);
      });
  }
  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }

  // userLogIn(data: login) {
  //   console.warn(data);
  //   this.http
  //     .get(
  //       'http://localhost:3000/seller?email=${data.email}&password=${data.password}',
  //       { observe: 'response' }
  //     )
  //     .subscribe((result: any) => {
  //       console.warn(result);
  //       if (result && result.body && result.body.length) {
  //         console.warn('user is loggin in');
  //       } else {
  //         console.warn('invalid data');
  //       }
  //     });
  // }
  userLogin(data: login) {
    console.warn(data);
    this.http
      .get(
        `http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
        { observe: 'response' }
      )
      .subscribe((result: any) => {
        console.warn(result);
        if (result && result.body && result.body.length === 1) {
          console.warn('login');
          localStorage.setItem('seller', JSON.stringify(result.body));
          this.router.navigate(['seller-home']);
        } else {
          console.warn('login failed');
          this.isLogInError.emit(true);
        }
      });
  }
}
