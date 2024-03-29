import { Component, OnInit } from '@angular/core';
import {Angular2TokenService, ResetPasswordData} from 'angular2-token';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private _tokenService: Angular2TokenService,
              private route: Router) { }

  resetPasswordData: ResetPasswordData = <ResetPasswordData>{};
  output:            any;
  errors:            null;

  ngOnInit() { }

  onSubmit() {
    this.output = null;

    this._tokenService.resetPassword(this.resetPasswordData).subscribe(
      res => {
        console.log(res);
        this.resetPasswordData = <ResetPasswordData>{};
        this.output            = res;
        this.route.navigate(['/login']);
      }, error => {
        this.resetPasswordData = <ResetPasswordData>{};
        this.output            = error;
        this.errors            = JSON.parse(error._body).errors;
      }
    );
  }
}
