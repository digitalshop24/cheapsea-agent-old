import {Component, OnInit, forwardRef, ViewChild} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import {Angular2TokenService} from 'angular2-token';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-airline-autocomplete',
  templateUrl: './airline-autocomplete.component.html',
  styleUrls: ['./airline-autocomplete.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AirlineAutocompleteComponent),
      multi: true
    }]
})
export class AirlineAutocompleteComponent implements OnInit {

  constructor(private _tokenService: Angular2TokenService) { }

  private airlines:           any[];
  private airlines_names:     any[];
  private autocompleteResult: string;

  ngOnInit() {
  }

  getAirlines(event) {
    this.airlines_names = [];
    const q = event.target.value;
    return this._tokenService.post(
      'airlines/autocomplete',
      {query: q}).subscribe((res: any) => {
          this.airlines = res.json();
          this.airlines_names = this.airlines.map(airline => { return airline.name; });
        });
  }

  selectItem(event) {
    const selected = event.target.value;
    this.airlines.map(airline => {
      if (airline.name === selected) {
        this.autocompleteResult = airline.id;
      }
    });
    this.propagateChange(this.autocompleteResult);
  }

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term.length < 2 ? []
        : this.airlines_names.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))

  public registerOnTouched() { }
  public writeValue(obj: any) {}
  public registerOnChange(fn: any) { this.propagateChange = fn; }
  private propagateChange = (_: any) => { };

}
