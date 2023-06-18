import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Role } from 'src/app/models/role.enum';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  currentUser: User = new User();
  errorMessage: string = '';

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authenticationService.currentUser.subscribe((user) => {
      this.currentUser = user;
    });
  }

  changeRole() {
    const newRole =
      this.currentUser.role === Role.ADMIN ? Role.USER : Role.ADMIN;

    this.userService.changeRole(newRole).subscribe({
      next: () => {
        this.authenticationService.logOut();
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.errorMessage = 'Unexpected error occurred.';
        console.log(error);
      },
    });
  }
}
