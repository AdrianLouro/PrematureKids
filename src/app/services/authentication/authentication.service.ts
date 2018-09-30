import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticationState = new BehaviorSubject(null);

  constructor(private storage: Storage, private platform: Platform) {
    this.platform.ready().then(() => {
      this.checkToken();
    });
  }

  isAuthenticated() {
    return this.authenticationState.value !== null;
  }

  isAuthenticatedAs(role: string) {
    return this.authenticationState.value === role;
  }

  loginWithToken(token: String) {
    return this.storage.set(TOKEN_KEY, token).then(res => {
      this.authenticationState.next(token);
    });
  }

  logout() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(null);
    });
  }

  checkToken() {
    return this.storage.get(TOKEN_KEY).then(token => {
        this.authenticationState.next(token);
    });
  }

}
