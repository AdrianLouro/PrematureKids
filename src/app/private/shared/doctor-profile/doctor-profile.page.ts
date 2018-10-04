import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.page.html',
  styleUrls: ['./doctor-profile.page.scss'],
})
export class DoctorProfilePage implements OnInit {

  authenticatedAsDoctor = false;

  constructor(private toastController: ToastController,
    private authService: AuthenticationService,
    private router: Router) {
    this.authenticatedAsDoctor = this.authService.isAuthenticatedAs('doctor');
  }

  ngOnInit() {
  }

  editProfile() {
    this.presentToast();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your profile has been edited.',
      cssClass: 'primary',
      showCloseButton: true,
      closeButtonText: 'OK'
    });
    toast.present();
  }

  openChat() {
    this.router.navigate(['private', 'shared', 'chat']);
  }

}
