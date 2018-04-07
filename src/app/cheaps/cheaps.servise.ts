import { Angular2TokenService } from 'angular2-token';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class CheapsServise {

  constructor(private _tokenService: Angular2TokenService) {}

  getCheaps() {
    return this._tokenService.get('api/v1/offers')
      .map(response => response.json());
  }

}
