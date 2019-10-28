import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/User';
import { AuthenticationService } from '../Services/authentication.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public user: User = new User();
  warning: boolean;
  errorMessage: string;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    if (localStorage.getItem('token') != null) {
      this.router.navigateByUrl('/location');
    }
  }

  Login() {
    this.authService.Login(this.user).subscribe(
      x => {
        localStorage.setItem('token', x.token);
        this.router.navigate(['/location']);
      },
      (err: HttpErrorResponse) => {
        this.errorMessage = err.error.message;
        this.warning = true;
      },
      () => console.log('Observer got a complete notification')
    );

    // if (!localStorage.getItem('isAuthenticated')) {
    //   this.warning = true;
    // } else {
    //   // tslint:disable-next-line: no-unused-expression
    //   this.router.navigate(['/location']);
    // }
  }

}
