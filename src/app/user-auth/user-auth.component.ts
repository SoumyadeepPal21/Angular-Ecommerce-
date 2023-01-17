import { Component, OnInit } from '@angular/core';
import { SignUp } from '../datatype';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css'],
})
export class UserAuthComponent implements OnInit {
  constructor(private user: UserService) {}
  isLoggedIn: boolean = false;
  ngOnInit(): void {
    this.user.userAuthReload();
  }
  SignUp(val: SignUp) {
    this.user.userSignUp(val);
  }
  LogIn(val: SignUp) {
    this.user.userLogIn(val);
  }
  openLogIn() {
    this.isLoggedIn = true;
  }
  openSignUp() {
    this.isLoggedIn = false;
  }
}
