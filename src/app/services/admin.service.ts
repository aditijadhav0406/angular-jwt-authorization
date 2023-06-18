import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { RequestBaseService } from './request-base.service';
import { AuthenticationService } from './authentication.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const API_URL = 'api/admin';
@Injectable({
  providedIn: 'root',
})
export class AdminService extends RequestBaseService {
  constructor(authenticationService: AuthenticationService, http: HttpClient) {
    super(authenticationService, http);
  }

  findAllUsers(): Observable<any> {
    return this.http.get('http://localhost:8090/api/admin/all', {
      headers: this.getHeaders,
    });
  }
}
