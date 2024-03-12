import { TestBed } from '@angular/core/testing';

import { LiquidezService } from './liquidez.service';

describe('LiquidezService', () => {
  let service: LiquidezService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiquidezService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
