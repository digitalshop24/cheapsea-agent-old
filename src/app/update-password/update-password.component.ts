import { Component, OnInit } from '@angular/core';
import { Angular2TokenService, UpdatePasswordData } from 'angular2-token';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {

  constructor(private _tokenService: Angular2TokenService,
              private route: Router,
              private router: ActivatedRoute) { }

  updatePasswordData: UpdatePasswordData = <UpdatePasswordData>{};
  output:             any;
  errors:             null;

  ngOnInit() { }

  onSubmit() {
    this.output = null;

    this._tokenService.updatePassword(this.updatePasswordData).subscribe(
      res => {
        this.updatePasswordData    = <UpdatePasswordData>{};
        this.output                = res;
        this.route.navigate(['/offers']);
      }, error => {
        this.updatePasswordData    = <UpdatePasswordData>{};
        this.output                = error;
        this.errors                = JSON.parse(error._body).errors.full_messages;
        console.log(error);
      }
    );
  }

}

