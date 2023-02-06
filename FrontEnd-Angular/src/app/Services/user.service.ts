import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  serverAddress: string = environment.ApiAddress + '/user/';

  getHttpParamFromObj = (data): HttpParams => {
    Object.keys(data).forEach((key) => data[key] == null && delete data[key]);
    return new HttpParams({ fromObject: data });
  };

  userSignIn(model: any) {
    return this.http.post<any>(this.serverAddress + 'login', model);
  }

  userSignUp(model: any) {
    return this.http.post<any>(this.serverAddress + 'signup', model);
  }

  getUser(userId: string) {
    return this.http.get(this.serverAddress, {
      params: this.getHttpParamFromObj({ productId: userId }),
    });
  }

  editUser(model: any) {
    return this.http.patch(this.serverAddress, model);
  }

  changePassword(model: any) {
    return this.http.post(this.serverAddress + '/change_password', model);
  }

  deleteUser(model: any) {
    return this.http.delete(this.serverAddress, model);
  }
}
