import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {ProductService} from "../product.service";
import {Product} from "../product";
import {Observable} from "rxjs/internal/Observable";


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})

export class ItemComponent implements OnInit {

  products: Product[];
  productId: string;
  val2: string;
  related: Product[];
  product: Observable<Product>;

  constructor(
      private route: ActivatedRoute,
      private ProductService: ProductService
  ) { }

  ngOnInit() {
      this.route.params.subscribe((params: Params) => {
          let userId = params['link'];
          this.ProductService.getProductByLink(userId).subscribe(
              product => {
                  this.products = product;
                  product.forEach(value => this.productId = value.id);
                  this.product = this.ProductService.getDocById(this.productId);
              })

      });

      this.ProductService.getProduct().subscribe(rel => {this.related = rel.slice(0,4)});
  }

}
