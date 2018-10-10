import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.page.html',
  styleUrls: ['./add-patient.page.scss'],
})
export class AddPatientPage implements OnInit {

  patients: any[];

  constructor(private location: Location,
    private alertController: AlertController) { }

  ngOnInit() {
  }

  searchPatients(event: any) {
    this.patients = event.target.value.length === 9 ? [1, 2] : [];
  }

  addPatient() {
    this.presentConfirmationAlert();
  }

  async presentConfirmationAlert() {
    const alert = await this.alertController.create({
      header: 'Are you sure you want to associate this patient?',
      // message: 'It will be permanently deleted!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'danger',
          handler: () => {
          }
        }, {
          text: 'Associate patient',
          handler: () => {
            this.location.back();
          }
        }
      ]
    });

    await alert.present();
  }

}
