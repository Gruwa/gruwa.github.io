import { TestBed, inject } from '@angular/core/testing';

import { AvailabilityService } from './availability.service';

describe('AvailabilityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AvailabilityService]
    });
  });

  it('should be created', inject([AvailabilityService], (service: AvailabilityService) => {
    expect(service).toBeTruthy();
  }));
});
