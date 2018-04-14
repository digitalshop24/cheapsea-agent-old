import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
// import { AuthService } from '../auth/auth.service';
import { Angular2TokenService, SignInData } from 'angular2-token';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  constructor(
    // private _authService: AuthService,
    private _tokenService: Angular2TokenService,
    private route: Router) {

    // if (this._authService.userSignedIn === true) {
    //   this.route.navigate(['/offers']);
    // }

  }

  private userLogin = {
    email:    '',
    password: ''
  };
  error: null;
  signInData: SignInData = <SignInData>{};
  output: any;

  ngOnInit() {
    // document.body.classList.add('login-bg');
    if (this._tokenService.userSignedIn()) {
      this.route.navigate(['/offers']);
    }
  }

  // ngAfterViewInit(){
  //   this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'yourColor';
  // }

  // ngOnDestroy(){
  //   document.body.style.backgroundImage = "none";
  // }

  logIn() {

    this.output = null;

    this._tokenService.signIn(this.signInData).subscribe(
      res => {
        this.signInData     = <SignInData>{};
        this.output         = res;
        this.route.navigate(['/offers']);
      }, error => {
        this.signInData     = <SignInData>{};
        this.output         = error;
      }
    );

    // let headerData;
    // this._authService._tokenService.signIn({
    //   email:    this.userLogin.email,
    //   password: this.userLogin.password
    // }).subscribe(
    //   res => {
    //     this.error = null;
    //     headerData = res;
    //   },
    //   error => {
    //     this.error = JSON.parse(error._body).errors[0];
    //   },
    //   () => {
    //     this._authService.setHeaders(headerData);
    //     this.route.navigate(['/offers']);
    //   }
    // );
  }

}
