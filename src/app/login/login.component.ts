import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private _authService: AuthService,
    private route: Router) {
  }

  ngOnInit() {
    document.body.classList.add('login-bg');
  }

  private userLogin = {
    email:    '',
    password: ''
  };
  error: null;

  logIn() {
    let headerData;
    this._authService._tokenService.signIn({
      email:    this.userLogin.email,
      password: this.userLogin.password
    }).subscribe(
      res => {
        this.error = null;
        headerData = res;
      },
      error => {
        this.error = JSON.parse(error._body).errors[0];
      },
      () => {
        this._authService.setHeaders(headerData);
        this.route.navigate(['/offers']);
      }
    );
  }

}
