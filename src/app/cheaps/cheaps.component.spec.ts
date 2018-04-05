import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheapsComponent } from './cheaps.component';

describe('CheapsComponent', () => {
  let component: CheapsComponent;
  let fixture: ComponentFixture<CheapsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheapsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
