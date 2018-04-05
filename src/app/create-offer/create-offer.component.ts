import { Component, OnInit } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';
import { ViewChild, ElementRef, NgZone } from '@angular/core';

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.css']
})
export class CreateOfferComponent implements OnInit {

  @ViewChild('search_city_from') public searchCityFrom: ElementRef;
  @ViewChild('search_city_to')   public searchCityTo:   ElementRef;

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) { }

  ngOnInit() {
    this.mapsAPILoader.load().then(
      () => {
        const autocompleteFrom = new google.maps.places.Autocomplete(this.searchCityFrom.nativeElement, { types: ['geocode'] });
        const autocompleteTo   = new google.maps.places.Autocomplete(this.searchCityTo.nativeElement,   { types: ['geocode'] });
        autocompleteFrom.addListener('place_changed', () => {
          this.ngZone.run(() => {
            const place: google.maps.places.PlaceResult = autocompleteFrom.getPlace();
            this.newOffer.offer_city_from = place.place_id;
          });
        });
        autocompleteTo.addListener('place_changed', () => {
          this.ngZone.run(() => {
            const place: google.maps.places.PlaceResult = autocompleteTo.getPlace();
            this.newOffer.offer_city_from = place.place_id;
          });
        });
      }
    );
  }

  private newOffer = {
    offer_type:     'airplane',
    offer_name:      null,
    offer_city_from: null,
    offer_city_to:   null,
  };

  // initAutocompletes() {
  //   angular.element('input-with-autocomplete').forEach(item => {
  //     console.log(item);
  //   });
  // }

}
