import { Component, OnInit } from '@angular/core';
import { UserProductService } from 'src/app/Services/user-product.service';

@Component({
  selector: 'app-shopping-cart-view',
  templateUrl: './shopping-cart-view.component.html',
  styleUrls: ['./shopping-cart-view.component.scss'],
})
export class ShoppingCartViewComponent implements OnInit {
  cardItem: any[] = [];
  constructor(private userProductService: UserProductService) {}

  ngOnInit(): void {
    this.userProductService.getProductCart.subscribe((data) => {
      this.cardItem.push(data);
    });

    if (!this.cardItem[0].name) {
      this.cardItem.shift();
    }
  }
}
