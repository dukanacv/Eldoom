import { TestBed } from '@angular/core/testing';

import { KursGuard } from './kurs.guard';

describe('KursGuard', () => {
  let guard: KursGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(KursGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
