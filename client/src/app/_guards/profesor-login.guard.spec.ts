import { TestBed } from '@angular/core/testing';

import { ProfesorLoginGuard } from './profesor-login.guard';

describe('ProfesorLoginGuard', () => {
  let guard: ProfesorLoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProfesorLoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
