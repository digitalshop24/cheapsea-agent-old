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

  constructor(private cheapsServise: CheapsServise) { }

  cheaps = [];

  ngOnInit() {
    document.body.classList.remove('login-bg');
    this.cheapsServise.getCheaps().subscribe(
      cheaps => { this.cheaps = cheaps; },
      error  => console.log(error)
    );
  }
}
