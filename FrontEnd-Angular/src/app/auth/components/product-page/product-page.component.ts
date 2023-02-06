import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/core/alert';
import { ProductService } from 'src/app/Services/product.service';
import { UserProductService } from 'src/app/Services/user-product.service';
import { __values } from 'tslib';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent implements OnInit {
  @Input() Item;

  comments: any[] = [];
  newCommentText: string = '';
  count: any = 0;
  size: any = 0;
  productId: string;
  productInfo: any;
  constructor(
    private userProductService: UserProductService,
    private alert: AlertService,
    private activatedRouter: ActivatedRoute
  ) {}

  ngOnInit() {
    this.productId = this.activatedRouter.snapshot.url[1].path;
    this.getProductInfo();
    this.getProductComments();
  }

  getProductInfo() {
    this.userProductService
      .getProductUser(this.productId)
      .subscribe((data: any) => {
        this.productInfo = data.products[0];
      });
  }

  getProductComments() {
    this.userProductService
      .getCommentForProduct(this.productId)
      .subscribe((data: any) => {
        console.log(data.comments);
        this.comments = data.comments;
      });
  }

  NewComment($event) {
    this.newCommentText = $event.target.value;
  }

  AddComment() {
    this.userProductService
      .addComment(this.productId, this.newCommentText)
      .subscribe((res: any) => {
        this.alert.showSnackbar(
          'Your Comment have been submitted! Thanks You For Chosing Us!😁',
          'SUCCESS',
          4000
        );
      });
  }

  addToCart() {
    this.alert.showSnackbar(
      'Your order have been submitted! Thanks You For Chosing Us!😁',
      'SUCCESS',
      4000
    );
    this.userProductService.setProductCart = {
      ...this.productInfo,
      quantity: this.count,
      size: this.size,
    };
  }

  onCountChange($event) {
    this.count = $event.target.value;
  }
  onSizeChange($event) {
    this.size = $event.target.value;
  }
}
