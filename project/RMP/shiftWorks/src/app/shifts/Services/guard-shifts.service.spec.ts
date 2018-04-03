import { TestBed, inject } from '@angular/core/testing';

import { GuardShiftsService } from './guard-shifts.service';

describe('GuardShiftsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GuardShiftsService]
    });
  });

  it('should be created', inject([GuardShiftsService], (service: GuardShiftsService) => {
    expect(service).toBeTruthy();
  }));
});
