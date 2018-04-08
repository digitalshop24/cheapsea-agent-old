import { Component, OnInit, ElementRef, ViewChild, NgZone, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
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

  @ViewChild('google_autocomplete') public searchAutocomplete: ElementRef;

  private autocompleteResult: string;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private elementRef: ElementRef,
  ) { }

  ngOnInit() {
    this.mapsAPILoader.load().then(
      () => {
        const autocompleteFrom = new google.maps.places.Autocomplete(
          this.elementRef.nativeElement.querySelector('.google-autocomplete'), { types: ['geocode'] });
        autocompleteFrom.getPlace();
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
  public writeValue(obj: any) {
    this.autocompleteResult = obj;
    // if (obj) {
    //   console.log(obj);
    //   const placesServices = new google.maps.places.PlacesService($('#predicted-places').get(0));
    //   placesServices.getDetails({
    //     placeId: obj
    //   }, (placeResult, status) => {
    //   });
    // }
  }
  public registerOnChange(fn: any) {this.propagateChange = fn;}
  private propagateChange = (_: any) => { };

}
