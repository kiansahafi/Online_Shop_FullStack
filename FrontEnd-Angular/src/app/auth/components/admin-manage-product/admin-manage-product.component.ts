import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminProductService } from 'src/app/Services/admin-product.service';

@Component({
  selector: 'app-admin-manage-product',
  templateUrl: './admin-manage-product.component.html',
  styleUrls: ['./admin-manage-product.component.scss'],
})
export class AdminManageProductComponent implements OnInit {
  constructor(
    private router: Router,
    private adminProductService: AdminProductService
  ) {}
  products: any[] = [];
  ngOnInit(): void {
    this.adminProductService.getProducts().subscribe((data: any) => {
      this.products = data.products;
    });
  }
  sendToAdminProductPage(index: any) {
    this.router.navigate(['admin', 'Product', this.products[index]._id]);
  }
}
