import { Component, OnInit } from '@angular/core';
import {CheapsServise} from '../cheaps.servise';

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
    this.cheapsServise.getCheaps().subscribe(cheaps => {
      this.cheaps = cheaps;
    });
  }
}
