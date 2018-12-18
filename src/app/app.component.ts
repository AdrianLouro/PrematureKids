import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './services/authentication/authentication.service';
import { Router, NavigationEnd } from '@angular/router';
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyDEG7YIeXszr8gntI4zNs-qk_U7te4P9b0',
  authDomain: 'prematurekidschat.firebaseapp.com',
  databaseURL: 'https://prematurekidschat.firebaseio.com',
  projectId: 'prematurekidschat',
  storageBucket: '',
  messagingSenderId: '674825846654'
};

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  appPages: any[];

  homePages = {
    'doctor': ['private', 'doctors', 'patients'],
    'administrator': ['private', 'administrators', 'doctors'],
    'parent': ['private', 'parents', 'parent-assignments']
  };

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthenticationService,
    private router: Router) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.checkAuthenticationState(); // TODO: do not show split pane when not authenticated
    });
    firebase.initializeApp(firebaseConfig);
  }

  checkAuthenticationState() {
    this.authService.authenticationState.subscribe(role => {
      this.setMenuForRole(role);
      this.navigateWithRole(role);
    });
  }

  navigateWithRole(role: any) {
    this.router.navigate(role === null ? ['home'] : this.homePages[role]);
  }

  setMenuForRole(role: string) {
    if (role === 'doctor') {
      this.setMenuForDoctor();
    } else if (role === 'administrator') {
      this.setMenuForAdministrator();
    } else {
      this.setMenuForParent();
    }
  }

  setMenuForAdministrator() {
    this.appPages = [
      {
        title: 'Doctors',
        url: '/private/administrators/doctors',
        icon: 'contacts'
      },
      {
        title: 'Categories',
        url: '/private/administrators/categories',
        icon: 'paper'
      },
      {
        title: 'My profile',
        url: '/private/administrators/administrator-profile',
        icon: 'person'
      },
    ];
  }

  setMenuForParent() {
    this.appPages = [
      {
        title: 'My assignments',
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
        url: '/private/parents/parent-doctors',
        icon: 'contacts'
      },
      {
        title: 'My profile',
        url: '/private/shared/parent-profile/' + this.authService.getUserId(),
        icon: 'person'
      },
      {
        title: 'Chat',
        url: '/private/shared/chats',
        icon: 'chatbubbles'
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
        url: '/private/shared/doctor-profile/' + this.authService.getUserId(),
        icon: 'person'
      },
      {
        title: 'Exercises',
        url: '/private/doctors/exercises',
        icon: 'paper'
      },
      {
        title: 'Chat',
        url: '/private/shared/chats',
        icon: 'chatbubbles'
      },
    ];
  }

  logout() {
    this.authService.logout();
  }

}
