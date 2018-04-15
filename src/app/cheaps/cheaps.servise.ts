import { Angular2TokenService } from 'angular2-token';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class CheapsServise {

  constructor(private _tokenService: Angular2TokenService) {}

  getCheaps(page) {
    return this._tokenService.get('api/v1/offers', {params: {page: page}})
      .map(response => response.json());
  }

}
