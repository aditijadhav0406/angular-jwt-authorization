import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';
import { User } from './models/user.model';
import { Role } from './models/role.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-jwt-authorization';

  currentUser: User = new User();
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.authenticationService.currentUser.subscribe((data) => {
      this.currentUser = data;
      console.log('currentUser:', this.currentUser);
    });
  }
  isAdmin() {
    console.log('currentUser.role:', this.currentUser?.role);
    return this.currentUser?.role === Role.ADMIN;
  }
  logOut() {
    this.authenticationService.logOut();
    this.router.navigate(['/login']);
  }
}
