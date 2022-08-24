import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObavestenjeEditComponent } from './obavestenje-edit.component';

describe('ObavestenjeEditComponent', () => {
  let component: ObavestenjeEditComponent;
  let fixture: ComponentFixture<ObavestenjeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObavestenjeEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObavestenjeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
