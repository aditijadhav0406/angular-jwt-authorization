import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { User } from '../models/user.model';

const API_URL = 'http://localhost:8090/api/authentication';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  subscribe(arg0: (data: any) => void) {
    throw new Error('Method not implemented.');
  }
  public currentUser: Observable<User>;
  private currentUserSubject: BehaviorSubject<User>;

  constructor(private http: HttpClient) {
    let storageUser;
    const storageUserAsStr = localStorage.getItem('currentUser');
    if (storageUserAsStr) {
      storageUser = JSON.parse(storageUserAsStr);
    }

    this.currentUserSubject = new BehaviorSubject<User>(storageUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(user: User): Observable<any> {
    return this.http
      .post<User>('http://localhost:8090/api/authentication/sign-in', user)
      .pipe(
        map((response) => {
          if (response) {
            //set session-user
            this.setSessionUser(response);
          }
          return response;
        })
      );
  }

  setSessionUser(user: User) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  register(user: User): Observable<any> {
    return this.http.post(
      'http://localhost:8090/api/authentication/sign-up',
      user
    );
  }

  logOut() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(new User());
  }

  refreshToken(): Observable<any> {
    return this.http.post(
      'http://localhost:8090/api/authentication/refresh-token?token=' +
        this.currentUserValue?.refreshToken,
      {}
    );
  }
}
