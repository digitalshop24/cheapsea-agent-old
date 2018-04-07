import { Component, OnInit } from '@angular/core';
// import { AuthService } from '../auth/auth.service';
import { Angular2TokenService, RegisterData } from 'angular2-token';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(
    private _tokenService: Angular2TokenService,
    private route: Router) {}

  registerData: RegisterData = <RegisterData>{};
  output: any;

  ngOnInit() {
    document.body.classList.add('login-bg');
    if (this._tokenService.userSignedIn()) {
      this.route.navigate(['/offers']);
    }
  }

  // private userRegistration = {
  //   email:                 '',
  //   password:              '',
  //   password_confirmation: ''
  // };
  // error: null;

  signUp() {

    this.output = null;

    this._tokenService.registerAccount(this.registerData).subscribe(
      res => {
        this.registerData  = <RegisterData>{};
        this.output        = res;
        this.route.navigate(['/offers']);
      }, error => {
        this.registerData  = <RegisterData>{};
        this.output        = error;
      }
    );

    // this._authService._tokenService.registerAccount({
    //   email:                this.userRegistration.email,
    //   password:             this.userRegistration.password,
    //   passwordConfirmation: this.userRegistration.password_confirmation,
    // }).subscribe(
    //   res =>  {
    //     this.error = null;
    //   },
    //   error => {
    //     this.error =  JSON.parse(error._body).errors.full_messages[0];
    //   }
    // );
  }

}
