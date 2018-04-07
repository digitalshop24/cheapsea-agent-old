import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private _tokenService: Angular2TokenService,
              private route: Router) { }

  output: any;

  onSubmit() {

    this.output = null;

    this._tokenService.signOut().subscribe(
      res => {
        this.output = res;
        this.route.navigate(['/login']);
        },
      error => this.output = error
    );
  }

  ngOnInit() {}
}
