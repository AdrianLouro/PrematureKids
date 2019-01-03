import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './services/authentication/authentication.service';
import { Router } from '@angular/router';
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

  authenticated = false;

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
      this.authenticated = true;
    } else if (role === 'administrator') {
      this.setMenuForAdministrator();
      this.authenticated = true;
    } else if (role === 'parent') {
      this.setMenuForParent();
      this.authenticated = true;
    } else {
      this.appPages = [];
      this.authenticated = false;
    }
  }

  setMenuForAdministrator() {
    this.appPages = [
      {
        title: 'Doctores',
        url: '/private/administrators/doctors',
        icon: 'contacts'
      },
      {
        title: 'Categorías',
        url: '/private/administrators/categories',
        icon: 'paper'
      },
      {
        title: 'Mi perfil',
        url: '/private/administrators/administrator-profile',
        icon: 'person'
      },
    ];
  }

  setMenuForParent() {
    this.appPages = [
      {
        title: 'Mis tareas',
        url: '/private/parents/parent-assignments',
        icon: 'paper'
      },
      {
        title: 'Mis hijos',
        url: '/private/parents/children',
        icon: 'happy'
      },
      // {
      //   title: 'My doctors',
      //   url: '/private/parents/parent-doctors',
      //   icon: 'contacts'
      // },
      {
        title: 'Mi perfil',
        url: '/private/parents/parent-profile/' + this.authService.getUserId(),
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
        title: 'Mis pacientes',
        url: '/private/doctors/patients',
        icon: 'happy'
      },
      // {
      //   title: 'My parents',
      //   url: '/private/doctors/parents',
      //   icon: 'contacts'
      // },
      {
        title: 'Mis ejercicios',
        url: '/private/doctors/doctor-exercises',
        icon: 'paper'
      },
      {
        title: 'Mi perfil',
        url: '/private/shared/doctor-profile/' + this.authService.getUserId(),
        icon: 'person'
      },
      {
        title: 'Ejercicios',
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
