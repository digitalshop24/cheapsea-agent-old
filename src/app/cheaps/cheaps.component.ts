import { Component, OnInit } from '@angular/core';
import {CheapsServise} from './cheaps.servise';
import {Angular2TokenService} from 'angular2-token';
import {UserData} from 'angular2-token/angular2-token.model';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-cheaps',
  templateUrl: './cheaps.component.html',
  styleUrls: ['./cheaps.component.scss'],
  providers: [CheapsServise]
})
export class CheapsComponent implements OnInit {

  constructor(
    private cheapsServise: CheapsServise,
    private tokenService: Angular2TokenService,
    private http: HttpClient
  ) { }

  p: number = 1;
  cheaps = [];
  user: any;


  ngOnInit() {
    document.body.classList.remove('login-bg');


    this.tokenService.validateToken().subscribe((res: any) => {
      this.user = res.json().data;

      this.cheapsServise.getCheaps(this.p).subscribe(
        cheaps => {
          console.log(cheaps);
          this.cheaps = cheaps; },
        error  => console.log(error)
      );
    });
  }

  getPlaceName(place_id) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?place_id=${place_id}&key=AIzaSyBEX35MB2wDC4dXdecw6SdFfu-_z-gD5rI`;
    this.http.get(url).subscribe((res: any) => {
      return res.results[0].formatted_address;
    });
  }

}


// https://github.com/michaelbromley/ngx-pagination#server-side-paging
