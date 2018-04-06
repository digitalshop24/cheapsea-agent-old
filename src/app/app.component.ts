import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import {Router} from '@angular/router';
import {environment} from '../environments/environment';
import {CheapsServise} from './cheaps.servise';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private _authService: AuthService) { }

  ngOnInit() {
    this._authService.initAuthPlugin();

    if (localStorage.getItem('accessToken')) {
      this._authService._tokenService.validateToken().subscribe((res: any) => {
        this._authService.userSignedIn = true;
        this._authService.user = JSON.parse(res._body).data;

        console.log(this._authService.user);


        // let userType: string;
        // !res.data.latitude ? userType = 'user' : userType = 'serviceUser';
        // this.auth.user.type = userType;
        // res.data.type = userType;
        // this.auth.user$.next(res.data);
      });

    }
  }

}
