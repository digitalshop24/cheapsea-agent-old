import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheapComponent } from './cheap.component';

describe('CheapComponent', () => {
  let component: CheapComponent;
  let fixture: ComponentFixture<CheapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
