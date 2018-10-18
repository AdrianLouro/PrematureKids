import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { JwtHelper } from 'angular2-jwt';

const TOKEN_KEY = 'jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticationState = new BehaviorSubject(null);
  jwtHelper: JwtHelper;

  constructor(private storage: Storage,
    private platform: Platform,
  ) {
    this.platform.ready().then(() => {
      this.jwtHelper = new JwtHelper();
      this.checkToken();
    });
  }

  isAuthenticated() {
    return this.authenticationState.value !== null;
  }

  isAuthenticatedAs(role: string) {
    return this.authenticationState.value === role;
  }

  loginWithToken(token: string) {
    return this.storage.set(TOKEN_KEY, token).then(res => {
      this.authenticationState.next(this.jwtHelper.decodeToken(token).role);
    });
  }

  logout() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(null);
    });
  }

  checkToken() {
    return this.storage.get(TOKEN_KEY).then(token => {
      this.authenticationState.next(
        token == null || this.jwtHelper.isTokenExpired(token) ?
          null : this.jwtHelper.decodeToken(token).role
      );
    });
  }

}
