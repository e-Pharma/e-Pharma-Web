import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustSidebarComponent } from './cust-sidebar.component';

describe('CustSidebarComponent', () => {
  let component: CustSidebarComponent;
  let fixture: ComponentFixture<CustSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
