import { Component, OnInit } from '@angular/core';
import {CheapsServise} from '../cheaps.servise';
import { Angular2TokenService } from 'angular2-token';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-cheaps',
  templateUrl: './cheaps.component.html',
  styleUrls: ['./cheaps.component.scss'],
  providers: [CheapsServise]
})
export class CheapsComponent implements OnInit {

  constructor(private cheapsServise: CheapsServise) { }

  // constructor(
  //   private _authService: AuthService,
  // ) {
  //   console.log(_authService._tokenService.userSignedIn());
  //   this._authService._tokenService.get('api/v1/offers').subscribe(
  //     res =>      console.log(res),
  //     error =>    console.log(error )
  //   );
  // }

  cheaps = [];

  ngOnInit() {
    this.cheapsServise.getCheaps().subscribe(cheaps => {
      this.cheaps = cheaps;
    });
  }
}
