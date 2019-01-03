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
  decodedToken: any;
  token: any;

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
      this.decodedToken = this.jwtHelper.decodeToken(token);
      this.token = token;
      this.authenticationState.next(this.jwtHelper.decodeToken(token).role);
    });
  }

  logout() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.decodedToken = null;
      this.token = null;
      this.authenticationState.next(null);
    });
  }

  checkToken() {
    return this.storage.get(TOKEN_KEY).then(token => {
      if (token !== null) {
        this.decodedToken = this.jwtHelper.decodeToken(token);
      }
      this.token = token;
      this.authenticationState.next(
        token == null || this.jwtHelper.isTokenExpired(token) ?
          null : this.jwtHelper.decodeToken(token).role
      );
    });
  }

  getToken() {
    return this.token;
  }

  getDecodedToken() {
    return this.decodedToken;
  }

  getUserId() {
    return this.decodedToken == null ? undefined : this.decodedToken.sub;
  }

}
