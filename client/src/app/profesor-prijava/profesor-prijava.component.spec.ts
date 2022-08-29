import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesorPrijavaComponent } from './profesor-prijava.component';

describe('ProfesorPrijavaComponent', () => {
  let component: ProfesorPrijavaComponent;
  let fixture: ComponentFixture<ProfesorPrijavaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfesorPrijavaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesorPrijavaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
