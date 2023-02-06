import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserAdminService {
  constructor(private http: HttpClient) {}
  serverAddress: string = environment.ApiAddress + '/admin/user';

  getUserAdmin(model?: any) {
    return this.http.get(this.serverAddress, model);
  }
  createUserAdmin(model: any) {
    return this.http.post(this.serverAddress + '/verify', model);
  }
}
