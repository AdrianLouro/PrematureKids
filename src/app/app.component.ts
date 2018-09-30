import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './services/authentication/authentication.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  appPages: any[];

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
      this.checkAuthenticationState();
    });
  }

  checkAuthenticationState() {
    this.authService.authenticationState.subscribe(token => {
      this.setMenuForRole(token);
      this.navigateWitToken(token);
    });
  }

  navigateWitToken(token: string) {
    this.router.navigate(token === null ? ['home'] :
      token === 'doctor' ? ['private', 'doctors', 'doctor-dashboard'] :
        ['private', 'parents', 'parent-dashboard']);
  }

  setMenuForRole(role: string): any {
    role === 'doctor' ? this.setMenuForDoctor() : this.setMenuForParent();
  }

  setMenuForParent(): any {
    this.appPages = [
      {
        title: 'Parent Dashboard',
        url: '/private/parents/parent-dashboard',
        icon: 'home'
      }
    ];
  }

  setMenuForDoctor(): any {
    this.appPages = [
      {
        title: 'Doctor Dashboard',
        url: '/private/doctors/doctor-dashboard',
        icon: 'home'
      }
    ];
  }

  logout() {
    this.authService.logout();
  }

}
