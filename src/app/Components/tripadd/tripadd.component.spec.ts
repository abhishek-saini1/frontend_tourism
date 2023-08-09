import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripaddComponent } from './tripadd.component';

describe('TripaddComponent', () => {
  let component: TripaddComponent;
  let fixture: ComponentFixture<TripaddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TripaddComponent]
    });
    fixture = TestBed.createComponent(TripaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
