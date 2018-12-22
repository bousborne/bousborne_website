import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageWebcamsComponent } from './manage-webcams.component';

describe('ManageWebcamsComponent', () => {
  let component: ManageWebcamsComponent;
  let fixture: ComponentFixture<ManageWebcamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageWebcamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageWebcamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
