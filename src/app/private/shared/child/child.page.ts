import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController, Datetime } from '@ionic/angular';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../../services/http.service';

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
  childId: string;

  constructor(/*private popoverController: PopoverController*/
    private alertController: AlertController,
    private toastController: ToastController,
    private router: Router,
    private location: Location,
    private http: HttpService,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder) {
    this.authenticatedAsParent = this.authService.isAuthenticatedAs('parent');
    this.initEditChildForm();
    this.makeEditChildFormReadonlyIfNotParent();
  }

  initEditChildForm() {
    this.editChildForm = this.formBuilder.group({
      name: ['', Validators.required],
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
  }

  ionViewWillEnter() {
    this.route.params.subscribe(params => {
      this.childId = params['id'];
      this.loadAssignments();
      this.loadChildProfile();
      this.loadParents();
    });
  }

  loadParents() {
    this.http.get('/children/' + this.childId + '/parents').subscribe((res: any) => {
      this.parents = res;
    },
      err => console.log(err)
    );
  }

  loadChildProfile() {
    this.http.get('/children/' + this.childId).subscribe((res: any) => {
      this.editChildForm.setValue({
        name: res.name,
        gender: res.gender,
        dateOfBirth: new Date(res.dateOfBirth).toISOString(),
      });
    },
      err => console.log(err));
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
    this.http.put('/children/' + this.childId, {
      name: this.editChildForm.value['name'],
      dateOfBirth: !this.dateIsValid() ? new Date(
        this.editChildForm.value['dateOfBirth'].year.value,
        this.editChildForm.value['dateOfBirth'].month.value,
        this.editChildForm.value['dateOfBirth'].day.value,
        0,
        0,
        0,
        0
      ) : new Date(this.editChildForm.value['dateOfBirth']),
      gender: this.editChildForm.value['gender']
    }).subscribe((res: any) => {
      this.presentToast();
    },
      err => console.log(err)
    );
  }

  dateIsValid(): boolean {
    return !isNaN(new Date(this.editChildForm.value['dateOfBirth']).getTime());
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
            this.http.delete('/children/' + this.childId).subscribe((res: any) => {
              this.location.back();
            },
              err => console.log(err)
            );
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
    this.router.navigate(['private', 'parents', 'add-parent', { childId: this.childId }]);
  }

}
