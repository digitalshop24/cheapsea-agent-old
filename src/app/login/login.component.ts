import { Component, OnInit } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title: string;

  constructor(private _tokenService: Angular2TokenService) {
    this._tokenService.init({apiBase: 'https://tours13.herokuapp.com'});
  }

  ngOnInit() {
  }

  private userLogin = {
    email:    "",
    password: ""
  }

  logIn() {
    console.log('kuku');
    console.log(this.userLogin);

    this._tokenService.signIn({
      email:    this.userLogin.email,
      password: this.userLogin.password
    }).subscribe(
      res =>      console.log(res),
      error =>    console.log(error)
    );
  }

}
