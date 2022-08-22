import { TestBed } from '@angular/core/testing';

import { ProfesorLoggedinGuard } from './profesor-loggedin.guard';

describe('ProfesorLoggedinGuard', () => {
  let guard: ProfesorLoggedinGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProfesorLoggedinGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
