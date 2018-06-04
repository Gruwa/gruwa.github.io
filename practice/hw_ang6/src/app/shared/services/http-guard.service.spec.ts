import { TestBed, inject } from '@angular/core/testing';
import {HttpGuardService} from './http-guard.service';


describe('HttpGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpGuardService]
    });
  });

  it('should be created', inject([HttpGuardService], (service: HttpGuardService) => {
    expect(service).toBeTruthy();
  }));
});
