import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController, Datetime } from '@ionic/angular';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-child',
  templateUrl: './child.page.html',
  styleUrls: ['./child.page.scss'],
})
export class ChildPage implements OnInit {

  authenticatedAsParent = false;
  segment = 'assignments';
  assignments: any[];
  parents: any[];
  editChildForm: FormGroup;

  constructor(/*private popoverController: PopoverController*/
    private alertController: AlertController,
    private toastController: ToastController,
    private router: Router,
    private location: Location,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder) {
    this.authenticatedAsParent = this.authService.isAuthenticatedAs('parent');
    this.initEditChildForm();
    this.makeEditChildFormReadonlyIfNotParent();
  }

  initEditChildForm() {
    this.editChildForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
    });
  }

  makeEditChildFormReadonlyIfNotParent() {
    if (!this.authenticatedAsParent) {
      this.editChildForm.disable();
    }
  }

  ngOnInit() {
    this.loadAssignments();
    this.loadChildProfile();
    this.loadParents();
  }

  loadParents() {
    this.parents = [1, 2];
  }

  loadChildProfile() {
    this.editChildForm.setValue({
      fullName: 'John Doe Jr',
      gender: Math.random() > 0.5 ? 'm' : 'f',
      dateOfBirth: new Date().toISOString(),
    });
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

  navigateToAddParent() {
    this.router.navigate(['private', 'parents', 'add-parent']);
  }

}
