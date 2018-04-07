import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineAutocompleteComponent } from './airline-autocomplete.component';

describe('AirlineAutocompleteComponent', () => {
  let component: AirlineAutocompleteComponent;
  let fixture: ComponentFixture<AirlineAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirlineAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
