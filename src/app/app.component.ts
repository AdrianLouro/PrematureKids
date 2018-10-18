import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './services/authentication/authentication.service';
import { Router, NavigationEnd } from '@angular/router';
import { HttpService } from './services/http.service';

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
    private router: Router,
    private http: HttpService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.checkAuthenticationState(); // TODO: do not show split pane when not authenticated
    });
  }

  checkAuthenticationState() {
    this.authService.authenticationState.subscribe(role => {
      this.setMenuForRole(role);
      this.navigateWithRole(role);
    });
  }

  navigateWithRole(role: any) {
    this.router.navigate(role === null ? ['home'] :
      role === 'doctor' ? ['private', 'doctors', 'patients'] :
        ['private', 'parents', 'parent-assignments']);
  }

  setMenuForRole(role: string) {
    role === 'doctor' ? this.setMenuForDoctor() : this.setMenuForParent();
  }

  setMenuForParent() {
    this.appPages = [
      {
        title: 'My exercises',
        url: '/private/parents/parent-assignments',
        icon: 'paper'
      },
      {
        title: 'My children',
        url: '/private/shared/children',
        icon: 'happy'
      },
      {
        title: 'My doctors',
        url: '/private/parents/doctors',
        icon: 'contacts'
      },
      {
        title: 'My profile',
        url: '/private/shared/parent-profile',
        icon: 'person'
      },
    ];
  }

  setMenuForDoctor() {
    this.appPages = [
      {
        title: 'My patients',
        url: '/private/doctors/patients',
        icon: 'happy'
      },
      {
        title: 'My parents',
        url: '/private/doctors/parents',
        icon: 'contacts'
      },
      {
        title: 'My exercises',
        url: '/private/doctors/doctor-exercises',
        icon: 'paper'
      },
      {
        title: 'My profile',
        url: '/private/shared/doctor-profile',
        icon: 'person'
      },
      {
        title: 'Exercises',
        url: '/private/doctors/exercises',
        icon: 'paper'
      },
    ];
  }

  logout() {
    this.authService.logout();
  }

}
