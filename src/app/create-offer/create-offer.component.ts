import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import {Angular2TokenService} from 'angular2-token';

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.css']
})

export class CreateOfferComponent implements OnInit {
  public newOfferForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _tokenService: Angular2TokenService
  ) { }

  ngOnInit() {
    // this.newOfferForm = this._fb.group({
    //   offer_type:            ['', [Validators.required]],
    //   name:                  ['', [Validators.required]],
    //   from_google_place_id:  ['', [Validators.required]],
    //   to_google_place_id:    ['', [Validators.required]],
    //   direct_trip:           ['1'],
    //   price:                 ['', [Validators.required]],
    //   transfers:             this._fb.array([]),
    //   date_from:             [''],
    //   date_to:               [''],
    //   date_end:              [''],
    //   discount_rate:         [''],
    //   description:           ['']
    // });
    // SEED DATA ==>>>
    this.newOfferForm = this._fb.group({
      offer_type:            ['airplane', [Validators.required]],
      name:                  ['Дешевый билет в Крым', [Validators.required]],
      from_google_place_id:  ['ChIJkfrH7elR6kARkpRoogcKsfY', [Validators.required]],
      to_google_place_id:    ['ChIJtUL3_RopQg0RdZUd0e3YLoA', [Validators.required]],
      direct_trip:           ['1'],
      price:                 ['4500', [Validators.required]],
      transfers:             this._fb.array([]),
      date_from:             [{year: 2018, month: 4, day: 28}],
      date_to:               [{year: 2018, month: 5, day: 28}],
      date_end:              [{year: 2018, month: 5, day: 1}],
      discount_rate:         ['50'],
      description:           ['Бери и лети!']
    });
  }

  initTransfer() {
    return this._fb.group({
      google_place_id: ['', Validators.required],
      airline_id:      ['']
    });
  }

  addTransfer() {
    const control = <FormArray>this.newOfferForm.controls['transfers'];
    if (!this.newOfferForm.value.direct_trip) {
      control.push(this.initTransfer());
    } else {
      this.removeTransfer(control.length);
      while (control.length) {
        control.removeAt(0);
      }
    }
  }

  removeTransfer(i: number) {
    const control = <FormArray>this.newOfferForm.controls['transfers'];
    control.removeAt(i);
  }

  checkMinMaxValues(event, min, max) {
    if (event.target.value < min) {
      event.target.value = min;
    }
    if (event.target.value > max) {
      event.target.value = max;
    }
  }


  createOffer(model) {
    console.log(model);
    this._tokenService.post(
      'api/v1/offers',
      model.value).subscribe((res: any) => {
        console.log(res);
    });
  }

}
