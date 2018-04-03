import { Component, OnInit } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _tokenService: Angular2TokenService) {
    this._tokenService.init({apiBase: environment.server_url});
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
    console.log(this.userLogin);

    this._tokenService.signIn({
      email:    this.userLogin.email,
      password: this.userLogin.password
    }).subscribe(
      res => {
        this.error = null;
      },
      error => {
        this.error = JSON.parse(error._body).errors[0];
      }
    );
  }

}
