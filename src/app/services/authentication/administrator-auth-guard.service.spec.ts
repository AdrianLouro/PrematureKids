import { TestBed, inject } from '@angular/core/testing';

import { AdministratorAuthGuardService } from './administrator-auth-guard.service';

describe('AdministratorAuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdministratorAuthGuardService]
    });
  });

  it('should be created', inject([AdministratorAuthGuardService], (service: AdministratorAuthGuardService) => {
    expect(service).toBeTruthy();
  }));
});
