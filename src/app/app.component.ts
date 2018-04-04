import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import {Router} from '@angular/router';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private _authService: AuthService) {

    this._authService.initAuthPlugin();

    if (localStorage.getItem('accessToken')) {
      this._authService._tokenService.validateToken().subscribe(res => {
        console.log(res);
        this._authService.userSignedIn = true;
        // this._authService.user = res.data;

        // let userType: string;
        // !res.data.latitude ? userType = 'user' : userType = 'serviceUser';
        // this.auth.user.type = userType;
        // res.data.type = userType;
        // this.auth.user$.next(res.data);
      });

    }
  }

}
