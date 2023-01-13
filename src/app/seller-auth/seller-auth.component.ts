import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import {Router} from '@angular/router'
import { SignUp } from '../datatype';


@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css'],
})
export class SellerAuthComponent implements OnInit {
  constructor(private seller: SellerService, private router: Router) {}
  showLogIn = false;
  authError:string = '';
  ngOnInit(): void {
    this.seller.reloadSeller();
  }
  signUp(data: SignUp): void {
    this.seller.userSignUp(data);
  }
  openLogIn() {
    this.showLogIn = true;
  }
  openSignUp() {
    this.showLogIn = false;
  }
  logIn(data: SignUp): void {
    this.authError = "";
    this.seller.userLogin(data);
    this.seller.isLogInError.subscribe((error)=>{
      if (error) {
        this.authError = "Email or password is not correct";
      }
    })
    // // console.warn(data);
    // this.seller.userLogin(data);
  }
}

