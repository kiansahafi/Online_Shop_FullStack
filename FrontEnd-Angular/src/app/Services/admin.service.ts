import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}
  serverAddress: string = environment.ApiAddress + '/admin/';

  signUpAdmin(model: any) {
    return this.http.post(this.serverAddress, model);
  }

  loginAdmin(model: any) {
    return this.http.post(this.serverAddress + '/login', model);
  }

  getAdmin(model: any) {
    return this.http.get(this.serverAddress, model);
  }

  editAdmin(model: any) {
    return this.http.patch(this.serverAddress, model);
  }

  changePasswordAdmin(model: any) {
    return this.http.post(this.serverAddress, model);
  }
}
