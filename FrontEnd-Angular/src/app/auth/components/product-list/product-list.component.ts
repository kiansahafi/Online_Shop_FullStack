import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/Services/product.service';
import { UserProductService } from 'src/app/Services/user-product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  constructor(
    private router: Router,
    private userProductService: UserProductService
  ) {}
  products: any[] = [];
  ngOnInit(): void {
    this.userProductService.getProductsUser().subscribe((data: any) => {
      this.products = data.products;
      console.log(data.products);
    });
  }
  sendToProductPage(index: any) {
    this.router.navigate(['Product-Page', this.products[index]._id]);
  }
}
