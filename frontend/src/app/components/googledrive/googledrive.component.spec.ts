import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogledriveComponent } from './googledrive.component';

describe('GoogledriveComponent', () => {
  let component: GoogledriveComponent;
  let fixture: ComponentFixture<GoogledriveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoogledriveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogledriveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
