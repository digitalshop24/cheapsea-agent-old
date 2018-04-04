import { Component, OnInit } from '@angular/core';
import { Angular2TokenService } from 'angular2-token';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-cheap',
  templateUrl: './cheap.component.html',
  styleUrls: ['./cheap.component.css']
})
export class CheapComponent implements OnInit {

  constructor(
    private _authService: AuthService,
  ) {
    console.log(_authService._tokenService.userSignedIn());
    this._authService._tokenService.get('api/v1/offers').subscribe(
      res =>      console.log(res),
      error =>    console.log(error )
    );
  }

  ngOnInit() {
    document.body.classList.remove('login-bg');
  }

}
