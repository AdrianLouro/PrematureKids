import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthenticationService } from '../../../services/authentication/authentication.service';

@Component({
  selector: 'app-parent-profile',
  templateUrl: './parent-profile.page.html',
  styleUrls: ['./parent-profile.page.scss'],
})
export class ParentProfilePage implements OnInit {

  authenticatedAsParent = false;

  constructor(private toastController: ToastController,
    private authService: AuthenticationService) {
    this.authenticatedAsParent = this.authService.isAuthenticatedAs('parent');
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

}
