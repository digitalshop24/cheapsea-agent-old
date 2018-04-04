import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(
    private _authService: AuthService) {
  }

  ngOnInit() {
    document.body.classList.add('login-bg');
  }

  private userRegistration = {
    email:                 '',
    password:              '',
    password_confirmation: ''
  };
  error: null;

  signUp() {
    this._authService._tokenService.registerAccount({
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
