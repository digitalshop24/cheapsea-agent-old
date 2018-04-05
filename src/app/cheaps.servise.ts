import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class CheapsServise {

  constructor(private http: Http) {}

  getCheaps() {
    return this.http.get('http://localhost:3000/api/v1/offers')
      .map(response => response.json());
  }

}
