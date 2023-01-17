import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from '../datatype';
import { ProductService } from '../services/product.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchResults: undefined | product[];
  noResultMessage : undefined | string;
  constructor(
    private activeRoute: ActivatedRoute,
    private product: ProductService
  ) {}

  ngOnInit(): void {
    let query = this.activeRoute.snapshot.paramMap.get('query');
    query &&
      this.product.serachProducts(query).subscribe((result) => {
        if (result.length) {
          this.searchResults = result;
        } else {
          this.noResultMessage = 'No results found';
        }
        console.warn(this.noResultMessage);
      });
  }
}
