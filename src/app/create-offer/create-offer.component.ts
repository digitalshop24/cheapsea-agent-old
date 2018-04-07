import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.css']
})

export class CreateOfferComponent implements OnInit {
  public newOfferForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.newOfferForm = this._fb.group({
      offer_type:            ['', [Validators.required]],
      offer_name:            ['', [Validators.required]],
      from_google_place_id:  ['', [Validators.required]],
      to_google_place_id:    ['', [Validators.required]],
      direct_trip:           ['1'],
      price:                 ['', [Validators.required]],
      transfers:   this._fb.array([])
    });
  }

  initTransfer() {
    return this._fb.group({
      transfer_city: ['', Validators.required],
      airline:       ['']
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

  createOffer(model) {
    console.log(model);
  }

}
