import { TestBed, inject } from '@angular/core/testing';

import { FlowService } from './flow.service';

describe('DataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FlowService]
    });
  });

  it('should be created', inject([FlowService], (service: FlowService) => {
    expect(service).toBeTruthy();
  }));
});
