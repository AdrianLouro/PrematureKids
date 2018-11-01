import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { Location } from '@angular/common';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.page.html',
  styleUrls: ['./assignment.page.scss'],
})
export class AssignmentPage implements OnInit {

  authenticatedAsParent = false;
  segment = 'info';
  sessions: any[];

  constructor(private router: Router,
    private location: Location,
    private alertController: AlertController,
    private authService: AuthenticationService) {
    this.authenticatedAsParent = this.authService.isAuthenticatedAs('parent');
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadSessions();
  }

  loadSessions(): any {
    this.sessions = [1, 2, 3];
  }

  removeAssignment() {
    this.presentConfirmationAlert();
  }

  async presentConfirmationAlert() {
    const alert = await this.alertController.create({
      header: 'Are you sure you want to delete this exercise?',
      message: 'It will be permanently deleted!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'danger',
          handler: () => {
          }
        }, {
          text: 'Delete exercise',
          handler: () => {
            this.location.back();
          }
        }
      ]
    });

    await alert.present();
  }
  navigateToSession() {
    this.router.navigate(['private', 'shared', 'session']);
  }

  navigateToCreateSession() {
    this.router.navigate(['private', 'parents', 'create-session']);
  }

  navigateToOpinion() {
    // this.router.navigate(['private', 'parents', 'opinion', { exerciseId: '11111111-1111-1111-1111-111111111111' }]);
    this.router.navigate(['private', 'parents', 'opinion', { exerciseId: '22222222-2222-2222-2222-222222222222' }]);
  }

}
