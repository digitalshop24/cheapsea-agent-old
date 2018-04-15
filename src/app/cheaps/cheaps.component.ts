import { Component, OnInit } from '@angular/core';
import {CheapsServise} from './cheaps.servise';
import {Angular2TokenService} from 'angular2-token';

@Component({
  selector: 'app-cheaps',
  templateUrl: './cheaps.component.html',
  styleUrls: ['./cheaps.component.scss'],
  providers: [CheapsServise]
})
export class CheapsComponent implements OnInit {

  p: number = 1;

  constructor(private cheapsServise: CheapsServise) { }

  cheaps = [];

  ngOnInit() {
    document.body.classList.remove('login-bg');
    this.cheapsServise.getCheaps(this.p).subscribe(
      cheaps => {
        console.log(cheaps);
        this.cheaps = cheaps; },
      error  => console.log(error)
    );
  }
}


// https://github.com/michaelbromley/ngx-pagination#server-side-paging
