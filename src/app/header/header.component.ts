import { VariableBinding } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuType: string = 'default';
  sellerName : string = '';
  constructor(private route : Router) { }

  ngOnInit(): void {
    this.route.events.subscribe((result : any) => {
      if (result.url) {
        if (localStorage.getItem('seller') && result.url.includes('seller')) {
          console.warn("in seller");
          this.menuType = "seller";
          if (localStorage.getItem('seller')) {
            let selllerStore = localStorage.getItem('seller');
            let sellerData = selllerStore && JSON.parse(selllerStore)[0];
            this.sellerName = sellerData.name;
          }
        } else {
          console.warn("outside seller");
          this.menuType = "default";
        }
      }
    });
  }
  logout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }

}
