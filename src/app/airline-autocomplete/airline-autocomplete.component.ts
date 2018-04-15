import {Component, OnInit, forwardRef, ViewChild} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import {Angular2TokenService} from 'angular2-token';
import {of} from 'rxjs/observable/of';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import {AirlineAutocompleteService} from './airline-autocomplete.servise';

@Component({
  selector: 'app-airline-autocomplete',
  templateUrl: './airline-autocomplete.component.html',
  styleUrls: ['./airline-autocomplete.component.css'],
  providers: [
    AirlineAutocompleteService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AirlineAutocompleteComponent),
      multi: true
    }]
})
export class AirlineAutocompleteComponent implements OnInit {

  constructor(
    private _tokenService: Angular2TokenService,
    private _service: AirlineAutocompleteService
  ) { }

  private airlines:           any[];
  private autocompleteResult: string;
  private selected_item:      any;

  searching    = false;
  searchFailed = false;
  hideSearchingWhenUnsubscribed = new Observable(() => () => this.searching = false);
  formatMatches = (value: any) => value.name || '';

  ngOnInit() {
  }

  selectItem() {
    setTimeout(() => {
      this.autocompleteResult = this.selected_item.id;
      this.propagateChange(this.autocompleteResult);
    }, 5);
  }

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(300)
      .distinctUntilChanged()
      .do(() => this.searching = true)
      .switchMap(term =>
        this._service.search(term)
          .do((res: any) => {
            this.airlines = res;
            this.searchFailed = false;
          })
          .catch(() => {
            this.searchFailed = true;
            return of([]);
          }))
      .do((res: any) => {
          this.airlines = res;
          this.searching = false;
      }
      )
      .merge(this.hideSearchingWhenUnsubscribed)

  public registerOnTouched() { }
  public writeValue(obj: any) {}
  public registerOnChange(fn: any) { this.propagateChange = fn; }
  private propagateChange = (_: any) => { };

}
