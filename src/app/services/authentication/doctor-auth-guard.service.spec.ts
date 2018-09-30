import { TestBed, inject } from '@angular/core/testing';

import { DoctorAuthGuardService } from './doctor-auth-guard.service';

describe('DoctorAuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DoctorAuthGuardService]
    });
  });

  it('should be created', inject([DoctorAuthGuardService], (service: DoctorAuthGuardService) => {
    expect(service).toBeTruthy();
  }));
});
