import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AlertController } from '@ionic/angular';
import { HttpService } from '../../../services/http.service';
import { AuthenticationService } from '../../../services/authentication/authentication.service';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.page.html',
  styleUrls: ['./add-patient.page.scss'],
})
export class AddPatientPage implements OnInit {

  patients: any[];

  constructor(private location: Location,
    private http: HttpService,
    private authService: AuthenticationService,
    private alertController: AlertController) { }

  ngOnInit() {
  }

  searchParent(event: any) {
    if (event.target.value.length !== 9) {
      this.patients = undefined;
      return;
    }

    this.http.get('/parents?idNumber=' + event.target.value).subscribe((res: any) => {
      if (res.length > 0) {
        this.searchPatientsOfParent(res[0]);
      }
    },
      err => console.log(err)
    );
  }

  searchPatientsOfParent(parent: any) {
    this.http.get('/parents/' + parent.id + '/children').subscribe((res: any) => {
      this.patients = res;
    },
      err => console.log(err)
    );
  }

  addPatient(patientId: any) {
    this.presentConfirmationAlert(patientId);
  }

  async presentConfirmationAlert(patientId: any) {
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
            this.http.post('/doctors/' + this.authService.getUserId() + '/patients/' + patientId, {}).subscribe((res: any) => {
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

}
