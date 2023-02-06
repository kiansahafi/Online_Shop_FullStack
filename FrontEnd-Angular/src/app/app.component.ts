import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from './core/alert';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Online Shop';
  products = [];

  constructor(private router: Router, private alert: AlertService) {}

  onCard() {
    this.router.navigate(['/Cart']);
  }

  ngOnInit(): void {
    this.alert.showSnackbar('Wellcome To My Website!😁', 'SUCCESS', 3000);
  }
  sendToProductPage(productId: any) {
    this.router.navigate(['Product-Page', productId]);
  }
  trasferProducts() {
    this.router.navigate(['product-list']);
  }
  showsignin(): boolean {
    return localStorage.getItem('token') ? false : true;
  }
  LogOut() {
    localStorage.clear();
  }
}
