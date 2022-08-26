import { TestBed } from '@angular/core/testing';

import { VestService } from './vest.service';

describe('VestService', () => {
  let service: VestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
