import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAboutUsComponent } from './customer-about-us.component';

describe('CustomerAboutUsComponent', () => {
  let component: CustomerAboutUsComponent;
  let fixture: ComponentFixture<CustomerAboutUsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerAboutUsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerAboutUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
