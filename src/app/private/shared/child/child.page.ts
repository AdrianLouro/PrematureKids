import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../../services/http.service';
import { DateService } from '../../../services/date.service';

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
  medicalHistoryIdAlreadyRegistered = false;

  constructor(/*private popoverController: PopoverController*/
    private alertController: AlertController,
    private toastController: ToastController,
    private router: Router,
    private dateService: DateService,
    private location: Location,
    private http: HttpService,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder) {
    this.authenticatedAsParent = this.authService.isAuthenticatedAs('parent');
    this.initEditChildForm();
  }

  initEditChildForm() {
    this.editChildForm = this.formBuilder.group({
      medicalHistoryId: ['', Validators.required],
      name: ['', Validators.required],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      weeksOfPregnancy: ['', Validators.required],
      medicalHistory: ['', Validators.required]
    });
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
        medicalHistoryId: res.medicalHistoryId,
        name: res.name,
        gender: res.gender,
        dateOfBirth: this.dateService.apiDateTimeToIonDateTimeStringDate(res.dateOfBirth),
        weeksOfPregnancy: res.weeksOfPregnancy,
        medicalHistory: res.medicalHistory,
      });
    },
      err => console.log(err));
  }

  loadAssignments() {
    this.http.get('/children/' + this.childId + '/assignments').subscribe((res: any) => {
      this.assignments = res;
    },
      err => console.log(err)
    );
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
      medicalHistoryId: this.editChildForm.value['medicalHistoryId'],
      name: this.editChildForm.value['name'],
      gender: this.editChildForm.value['gender'],
      dateOfBirth: this.dateService.ionDateTimeDateToUTC(this.editChildForm.value['dateOfBirth']),
      weeksOfPregnancy: this.editChildForm.value['weeksOfPregnancy'],
      medicalHistory: this.editChildForm.value['medicalHistory'],
    }).subscribe((res: any) => {
      this.medicalHistoryIdAlreadyRegistered = false;
      this.presentToast();
    },
      err => {
        if (err.status === 409) { this.medicalHistoryIdAlreadyRegistered = true; }
      }
    );
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'El paciente ha sido editado',
      cssClass: 'primary',
      duration: 3000
    });
    toast.present();
  }

  removeChild() {
    this.presentConfirmationAlert();
  }

  async presentConfirmationAlert() {
    const alert = await this.alertController.create({
      header: '¿Está seguro de que quiere eliminar el paciente?',
      message: '¡Se borrará permanentemente!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'danger',
          handler: () => {
          }
        }, {
          text: 'Eliminar paciente',
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

  async deleteParent(parentId: any) {
    const alert = await this.alertController.create({
      header: '¿Está seguro de que quiere desasociar el padre del paciente?',
      message: '¡El padre no podrá ver al paciente!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'danger',
          handler: () => {
          }
        }, {
          text: 'Desasociar',
          handler: () => {
            this.http.delete('/children/' + this.childId + '/parents/' + parentId).subscribe((res: any) => {
              this.parents = this.parents.filter(parent => parent.id !== parentId);
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
    this.router.navigate(['private', 'doctors', 'create-assignment', { childId: this.childId }]);
  }

  navigateToAssignment(id: any) {
    this.router.navigate(['private', 'shared', 'assignment', id]);
  }

  navigateToAddParent() {
    this.router.navigate(['private', 'doctors', 'add-parent', { childId: this.childId }]);
  }

}
