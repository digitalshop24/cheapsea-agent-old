import { Component, OnInit, ElementRef, ViewChild, NgZone, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
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
  public writeValue(obj: any) {}
  public registerOnChange(fn: any) {this.propagateChange = fn;}
  private propagateChange = (_: any) => { };

}
