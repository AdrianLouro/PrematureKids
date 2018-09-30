import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class DoctorAuthGuardService implements CanActivate {

  constructor(private authService: AuthenticationService) { }

  canActivate(): boolean {
    return this.authService.isAuthenticatedAs('doctor');
  }
}
