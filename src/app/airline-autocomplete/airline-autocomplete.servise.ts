import {Component, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/merge';
import {environment} from '../../environments/environment';

const autocomplete_url = environment.server_url + '/airlines/autocomplete';
const params = new HttpParams({});

@Injectable()
export class AirlineAutocompleteService {
  constructor(private http: HttpClient) {}

  search(term: string) {
    if (term === '') {
      return of([]);
    }
    return this.http
      .post(autocomplete_url, {query: term})
      .map(response => response);
  }
}
