import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Angular2TokenService, ResetPasswordData } from 'angular2-token';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.component.html',
  // templateUrl: '../create-offer/create-offer.component.html',
  styleUrls: ['./edit-offer.component.css'],
})

export class EditOfferComponent implements OnInit {
  public  editOfferForm: FormGroup;
  private id: number;
  private sub: any;
  private offer: any;

  constructor(
    private _fb: FormBuilder,
    private _tokenService: Angular2TokenService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this._tokenService.get(
      `/api/v1/offers/${this.id}`).subscribe((res: any) => {
        this.offer = res.json();
        this.setDataValue();
    });
  }

  setDataValue() {
    this.editOfferForm = this._fb.group({
      id:                    [this.id],
      offer_type:            [this.offer.offer_type, [Validators.required]],
      name:                  [this.offer.name, [Validators.required]],
      from_google_place_id:  [this.offer.from_google_place_id, [Validators.required]],
      to_google_place_id:    [this.offer.to_google_place_id, [Validators.required]],
      is_direct:             [this.offer.is_direct],
      price:                 [this.offer.price.fractional, [Validators.required]],
      transfers_params:       this._fb.array([]),
      date_from:             [this.parseDate(this.offer.date_from)],
      date_to:               [this.parseDate(this.offer.date_to)],
      date_end:              [this.parseDate(this.offer.date_end)],
      discount_rate:         [this.offer.discount_rate],
      description:           [this.offer.description]
    });

    const control = <FormArray>this.editOfferForm.controls['transfers_params'];
    this.offer.transfers.forEach((item) => {
      console.log(item.airline);
      console.log(item.google_place.place_id);
      control.push(this.buindTransfers(item.id, item.google_place.place_id, item.airline));
    });
  }

  initTransfer() {
    return this._fb.group({
      google_place_id: ['', Validators.required],
      airline_id:      ['']
    });
  }

  buindTransfers(id, place_id, airline_id) {
    return this._fb.group({
      id:              [id, Validators.required],
      google_place_id: [place_id, Validators.required],
      airline_id:      [airline_id]
    });
  }

  parseDate(old_date) {
    const date  = new Date(old_date);
    const year  = date.getFullYear();
    const month = date.getMonth();
    const day   = date.getDate();
    return {year: year, month: month, day: day};
  }

  addTransfer() {
    const control = <FormArray>this.editOfferForm.controls['transfers_params'];
    if (!this.editOfferForm.value.is_direct) {
      control.push(this.initTransfer());
    } else {
      this.removeTransfer(control.length);
      while (control.length) {
        control.removeAt(0);
      }
    }
  }

  removeTransfer(i: number) {
    const control = <FormArray>this.editOfferForm.controls['transfers_params'];
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
    model.value.date_from        = new Date(model.value.date_from.year, model.value.date_from.month, model.value.date_from.day);
    model.value.date_to          = new Date(model.value.date_to.year, model.value.date_to.month, model.value.date_to.day);
    model.value.date_end         = new Date(model.value.date_end.year, model.value.date_end.month, model.value.date_end.day);
    this._tokenService.put(
      `api/v1/offers/${this.id}`,
      model.value).subscribe((res: any) => {
      console.log(res);
    }, error => {
      console.log('NOT SO GOOD...');
      console.log(error);
      console.log('NOT SO GOOD...');
    });
  }

}

