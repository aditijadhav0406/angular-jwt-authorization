import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { RequestBaseService } from './request-base.service';
import { AuthenticationService } from './authentication.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = environment.BASE_URL + '/api/user';
@Injectable({
  providedIn: 'root',
})
export class UserService extends RequestBaseService {
  constructor(authenticationService: AuthenticationService, http: HttpClient) {
    super(authenticationService, http);
  }

  changeRole(newRole: String): Observable<any> {
    return this.http.put(
      'http://localhost:8090/api/user/change/' + newRole,
      {},
      { headers: this.getHeaders }
    );
  }
}
