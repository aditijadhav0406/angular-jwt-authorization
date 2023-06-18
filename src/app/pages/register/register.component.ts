import { Component, OnInit } from '@angular/core';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  user: User = new User();
  faUser = faUserCircle;
  errorMessage: string = '';

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authenticationService.currentUserValue?.id) {
      this.router.navigate(['/profile']);
    }
  }
  register() {
    this.authenticationService.register(this.user).subscribe({
      next: (data: any) => {
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        {
          if (err?.status === 409) {
            this.errorMessage = 'Username already exist.';
          } else {
            this.errorMessage = 'Unexpected error occurred.';
            console.log(err);
          }
        }
      },
    });
  }
}
/*async register() {
    try {
      await lastValueFrom(this.authenticationService.register(this.user));
      this.router.navigate(['/login']);
    } catch (err) {
      if (
        err instanceof HttpErrorResponse &&
        parseInt(err.status.toString(), 10) === 409
      ) {
        this.errorMessage = 'Username already exists.';
      } else {
        this.errorMessage = 'Unexpected error occurred.';
        console.log(err);
      }
    }
  }
}
*/
/*
     next:data =>
     { this.router.navigate(['/login']);
      },error:err => {
        if (err?.status === 409) {
          this.errorMessage = 'Username already exist.';
        } else {
          this.errorMessage = 'Unexpected error occurred.';
          console.log(err);
        }
      })
    }
  }
    try {
      await lastValueFrom(this.authenticationService.register(this.user));
      this.router.navigate(['/login']);
    } catch (err) {
      if (
        err instanceof HttpErrorResponse &&
        parseInt(err.status.toString(), 10) === 409
      ) {
        this.errorMessage = 'Username already exists.';
      } else {
        this.errorMessage = 'Unexpected error occurred.';
        console.log(err);
      }
    }*/
