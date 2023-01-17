import { Component, OnInit } from '@angular/core';
import { SignUp } from '../datatype';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css'],
})
export class UserAuthComponent implements OnInit {
  constructor(private user : UserService) {}

  ngOnInit(): void {}
  SignUp(val: SignUp) {
    // console.warn(val);
    this.user.userSignUp(val);
  }
}
