import { TestBed, inject } from '@angular/core/testing';

import { ParentAuthGuardService } from './parent-auth-guard.service';

describe('ParentAuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParentAuthGuardService]
    });
  });

  it('should be created', inject([ParentAuthGuardService], (service: ParentAuthGuardService) => {
    expect(service).toBeTruthy();
  }));
});
