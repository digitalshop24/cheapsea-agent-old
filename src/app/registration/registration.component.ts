import { Component, OnInit } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private _tokenService: Angular2TokenService) {
    this._tokenService.init({apiBase: environment.server_url});
  }

  ngOnInit() {
  }

  private userRegistration = {
    email:                 '',
    password:              '',
    password_confirmation: ''
  };
  error: null;

  signUp() {
    console.log(this.userRegistration);
    this._tokenService.registerAccount({
      email:                this.userRegistration.email,
      password:             this.userRegistration.password,
      passwordConfirmation: this.userRegistration.password_confirmation,
    }).subscribe(
      res =>  {
        this.error = null;
      },
      error => {
        this.error =  JSON.parse(error._body).errors.full_messages[0];
      }
    );
  }

}
