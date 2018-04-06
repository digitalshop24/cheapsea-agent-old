import { Angular2TokenService } from 'angular2-token';
import { AuthService } from './auth/auth.service';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class CheapsServise {

  constructor(private _authService: AuthService) {}

  getCheaps() {
    // return this.http.get('http://localhost:3000/api/v1/offers')
    console.log('userSignedIn:', this._authService._tokenService.userSignedIn());
    return this._authService._tokenService.get('api/v1/offers')
      .map(response => response.json());
  }

}
