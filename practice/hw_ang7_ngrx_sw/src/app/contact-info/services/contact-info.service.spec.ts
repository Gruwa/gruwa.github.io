import { TestBed, inject } from '@angular/core/testing';

import { ContactInfoService } from './contact-info.service';

describe('ContactInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContactInfoService]
    });
  });

  // it('should be created', inject([ContactInfoService], (service: ContactInfoService) => {
  //   expect(service).toBeTruthy();
  // }));
});
