import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserProductService {
  constructor(private http: HttpClient) {}

  productCart: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  serverAddress: string = environment.ApiAddress + '/user/product';

  getHttpParamFromObj = (data): HttpParams => {
    Object.keys(data).forEach((key) => data[key] == null && delete data[key]);
    return new HttpParams({ fromObject: data });
  };

  public get getProductCart(): Observable<any[]> {
    return this.productCart.asObservable();
  }

  public set setProductCart(v) {
    this.productCart.next(v);
  }

  getProductsUser() {
    return this.http.get(this.serverAddress);
  }

  getProductUser(userId: any) {
    return this.http.get(this.serverAddress, {
      params: this.getHttpParamFromObj({ productId: userId }),
    });
  }

  addComment(productId: string, comment: string) {
    return this.http.post(
      this.serverAddress + '/comment/productId/' + productId,
      {
        message: comment,
      }
    );
  }

  getComment(commentId: string) {
    return this.http.get(this.serverAddress + '/comment/' + commentId);
  }

  getCommentForProduct(ProductId: string) {
    return this.http.get(
      this.serverAddress + '/comment/productId/' + ProductId
    );
  }

  deleteComment(commentId: string) {
    return this.http.delete(this.serverAddress + '/comment/' + commentId);
  }
}
