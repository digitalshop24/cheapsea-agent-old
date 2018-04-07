import { Component, OnInit } from '@angular/core';
import { Angular2TokenService, UpdatePasswordData } from 'angular2-token';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {

  constructor(private _tokenService: Angular2TokenService,
              private route: Router,
              private router: ActivatedRoute) { }

  updatePasswordData: UpdatePasswordData = <UpdatePasswordData>{};
  output:             any;
  reset_password:     false;
  reset_password_token: null;

  ngOnInit() {
    this.router.queryParams.subscribe(params => {
      console.log(params);
      this.reset_password = params['reset_password'];
      this.reset_password_token = params['token'];
      console.log(this.reset_password);
      console.log(this.reset_password_token);
    });
  }

  onSubmit() {

    this.output = null;

    if (this.reset_password) {
      this.updatePasswordData.resetPasswordToken = this.reset_password_token;
      this.updatePasswordData.passwordCurrent = null;
    }

    console.log(this.updatePasswordData);

    this._tokenService.updatePassword(this.updatePasswordData).subscribe(
      res => {
        this.updatePasswordData    = <UpdatePasswordData>{};
        this.output                = res;
      }, error => {
        this.updatePasswordData    = <UpdatePasswordData>{};
        this.output                = error;
      }
    );
  }

}

