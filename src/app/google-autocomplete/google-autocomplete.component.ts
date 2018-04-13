import { Component, OnInit, ElementRef, ViewChild, NgZone, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { HttpClient } from '@angular/common/http';

import {} from '@types/googlemaps';


@Component({
  selector: 'app-google-autocomplete',
  templateUrl: './google-autocomplete.component.html',
  styleUrls: ['./google-autocomplete.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GoogleAutocompleteComponent),
      multi: true
    }]
})
export class GoogleAutocompleteComponent implements OnInit {

  private autocompleteResult: string;
  private autocompleteResultName: string;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private elementRef: ElementRef,
    private http: HttpClient,
  ) { }

  ngOnInit() {

    this.mapsAPILoader.load().then(
      () => {
        const autocompleteFrom = new google.maps.places.Autocomplete(
          this.elementRef.nativeElement.querySelector('.google-autocomplete'), { types: ['geocode'] });
        autocompleteFrom.addListener('place_changed', () => {
          this.ngZone.run(() => {
            const place: google.maps.places.PlaceResult = autocompleteFrom.getPlace();
            // this.newOffer.offer_city_from = place.place_id;
            this.autocompleteResult = place.place_id;
            this.propagateChange(this.autocompleteResult);
          });
        });
      }
    );
  }

  public registerOnTouched() { }
  private writeValue(obj: any) {
    this.autocompleteResult = obj;
    this.autocompleteResultName = '';
    if (obj) {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?place_id=${obj}&key=AIzaSyBEX35MB2wDC4dXdecw6SdFfu-_z-gD5rI`;
      this.http.get(url).subscribe((res: any) => {
        this.autocompleteResultName = res.results[0].formatted_address;
      });
    }
  }
  public registerOnChange(fn: any) {this.propagateChange = fn;}
  private propagateChange = (_: any) => { };

}
