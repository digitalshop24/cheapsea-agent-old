import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private _authService: AuthService,
              private route: Router) { }

  ngOnInit() {
    this._authService._tokenService.signOut().subscribe(
      res => {
        console.log('signOut', res);
        this._authService.removeAuthHeaders();
        this.route.navigate(['/login']);
      },
      error => console.log(error)
    );
  }
}
