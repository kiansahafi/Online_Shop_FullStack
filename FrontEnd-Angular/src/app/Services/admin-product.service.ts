import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminProductService {
  constructor(private http: HttpClient) {}
  serverAddress: string = environment.ApiAddress + '/admin/product/';

  getHttpParamFromObj = (data): HttpParams => {
    Object.keys(data).forEach((key) => data[key] == null && delete data[key]);
    return new HttpParams({ fromObject: data });
  };

  addProduct(model: any) {
    return this.http.post(this.serverAddress, model);
  }

  getProducts() {
    return this.http.get(this.serverAddress);
  }

  getProduct(productId: string) {
    return this.http.get(this.serverAddress + productId);
  }

  editProduct(productId: string, model: any) {
    return this.http.patch(this.serverAddress + productId, model);
  }

  deleteProduct(productId: string) {
    return this.http.delete(this.serverAddress + productId);
  }

  verifyComment(commentId: string) {
    return this.http.post(this.serverAddress + '/comment/verify/', {
      commentId: commentId,
    });
  }

  getComments(isVerified?: boolean) {
    return this.http.get(this.serverAddress + '/comment', {
      params: this.getHttpParamFromObj({ isVerified: isVerified }),
    });
  }

  getComment(commentId: string) {
    return this.http.get(this.serverAddress + '/comment/' + commentId);
  }

  getCommentsOfProduct(ProductId: string) {
    return this.http.get(this.serverAddress + '/comment/productId' + ProductId);
  }

  deleteComment(commentId: string) {
    return this.http.delete(this.serverAddress + '/comment/' + commentId);
  }
}
