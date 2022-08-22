import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesorLoginComponent } from './profesor-login.component';

describe('ProfesorLoginComponent', () => {
  let component: ProfesorLoginComponent;
  let fixture: ComponentFixture<ProfesorLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfesorLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesorLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
