import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-child',
  templateUrl: './child.page.html',
  styleUrls: ['./child.page.scss'],
})
export class ChildPage implements OnInit {

  authenticatedAsParent = false;
  segment = 'assignments';
  assignments: any[];

  constructor(/*private popoverController: PopoverController*/
    private alertController: AlertController,
    private toastController: ToastController,
    private router: Router,
    private location: Location,
    private authService: AuthenticationService) {
    this.authenticatedAsParent = this.authService.isAuthenticatedAs('parent');
  }

  ngOnInit() {
    this.loadAssignments();
  }

  loadAssignments() {
    this.assignments = [1, 2, 3, 4, 5];
  }

  // TODO: probar Popovers
  // https://stackoverflow.com/questions/41943716/ionic-2-how-to-call-parent-page-function-from-popover-component
  // https://www.youtube.com/watch?v=jRxPOs1OM34
  // async presentPopover(event: any) {
  //   const popover = await this.popoverController.create({
  //     component: ChildPage,
  //     event: event,
  //   });
  //   return await popover.present();
  // }

  editChild() {
    this.presentToast();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your child has been edited.',
      cssClass: 'primary',
      showCloseButton: true,
      closeButtonText: 'OK'
    });
    toast.present();
  }

  removeChild() {
    this.presentConfirmationAlert();
  }

  async presentConfirmationAlert() {
    const alert = await this.alertController.create({
      header: 'Are you sure you want to delete your child?',
      message: 'It will be permanently deleted!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'danger',
          handler: () => {
          }
        }, {
          text: 'Delete child',
          handler: () => {
            this.location.back();
          }
        }
      ]
    });

    await alert.present();
  }

  navigateToCreateAssignment() {
    this.router.navigate(['private', 'doctors', 'create-assignment']);
  }

  navigateToAssignment() {
    this.router.navigate(['private', 'shared', 'assignment']);
  }

}
