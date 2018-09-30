import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './services/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.navigate();
    });
  }

  navigate() {
    this.authService.authenticationState.subscribe(token => {
      console.log('Token: ' + token);
      this.router.navigate(token === null ? ['home'] :
        token === 'doctor' ? ['private', 'doctors', 'doctor-dashboard'] :
          ['private', 'parents', 'parent-dashboard']);
    });
  }
}
