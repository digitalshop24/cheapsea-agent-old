import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {environment} from '../environments/environment';
import {Angular2TokenService} from 'angular2-token';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // constructor(private _authService: AuthService) { }
  constructor(private tokenService: Angular2TokenService,
              private route: Router) { }

  ngOnInit() {
    this.tokenService.init({
      apiBase: environment.server_url,
      signInRedirect: 'login',
      resetPasswordCallback: environment.front_server_url + '/update-password'
    });
    // this.tokenService.validateToken().subscribe(
    //   res => res,
    //   error => { this.route.navigate(['/login']); }
    // );

    // this._authService.initAuthPlugin();
    //
    // if (localStorage.getItem('accessToken')) {
    //   this._authService._tokenService.validateToken().subscribe((res: any) => {
    //     this._authService.userSignedIn = true;
    //     this._authService.user = JSON.parse(res._body).data;
    //
    //     // let userType: string;
    //     // !res.data.latitude ? userType = 'user' : userType = 'serviceUser';
    //     // this.auth.user.type = userType;
    //     // res.data.type = userType;
    //     // this.auth.user$.next(res.data);
    //   });
    //
    // }
  }

}
