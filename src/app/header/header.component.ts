import { VariableBinding } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuType:String = 'default';
  constructor(private route : Router) { }

  ngOnInit(): void {
    menuType:
    this.route.events.subscribe((result : any) => {
      if (result.url) {
        if (localStorage.getItem('seller') && result.url.includes('seller')) {
          console.warn("in seller");
          this.menuType = "seller";
        } else {
          console.warn("outside seller");
          this.menuType = "default";
        }
      }
    });
  }

}
