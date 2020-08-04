import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMessageDialogComponent } from './view-message-dialog.component';

describe('ViewMessageDialogComponent', () => {
  let component: ViewMessageDialogComponent;
  let fixture: ComponentFixture<ViewMessageDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMessageDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMessageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
