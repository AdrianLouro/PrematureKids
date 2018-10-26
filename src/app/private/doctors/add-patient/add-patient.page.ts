import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AlertController } from '@ionic/angular';
import { HttpService } from '../../../services/http.service';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.page.html',
  styleUrls: ['./add-patient.page.scss'],
})
export class AddPatientPage implements OnInit {

  addPatientForm: FormGroup;
  patientDataFormGroup: FormGroup;
  patient: any;

  constructor(private location: Location,
    private http: HttpService,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private alertController: AlertController) {
    this.initAddPatientForm();
  }

  initAddPatientForm() {
    this.patientDataFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
    });

    this.addPatientForm = this.formBuilder.group({
      medicalHistoryId: ['', Validators.required],
      patientDataFormGroup: this.patientDataFormGroup
    });
  }

  ngOnInit() {
  }

  searchPatient(event: any) {
    if (event.target.value.length !== 9) {
      if (this.patient != null) { this.patientDataFormGroup.reset(); }
      this.patient = undefined;
      return;
    }

    this.http.get('/children?medicalHistoryId=' + event.target.value).subscribe((res: any) => {
      if (res.length > 0) {
        this.setPatient(res[0]);
      } else {
        this.patient = undefined;
      }
    },
      err => console.log(err)
    );
  }

  setPatient(patient: any) {
    this.patient = patient;

    this.addPatientForm.setValue({
      medicalHistoryId: patient.medicalHistoryId,
      patientDataFormGroup:
      {
        name: patient.name,
        gender: patient.gender,
        dateOfBirth: new Date(patient.dateOfBirth).toISOString(),
      }
    });

    // this.patientDataFormGroup.setValue({
    //   name: patient.name,
    //   gender: patient.gender,
    //   dateOfBirth: new Date(patient.dateOfBirth).toISOString(),
    // });
  }

  addPatient() {
    this.patient != null ? this.associatePatient() : this.createChild();
  }

  createChild() {
    this.http.post('/children', {
      medicalHistoryId: this.addPatientForm.value['medicalHistoryId'],
      name: this.patientDataFormGroup.value['name'],
      gender: this.patientDataFormGroup.value['gender'],
      dateOfBirth: new Date(
        this.patientDataFormGroup.value['dateOfBirth'].year.value,
        this.patientDataFormGroup.value['dateOfBirth'].month.value,
        this.patientDataFormGroup.value['dateOfBirth'].day.value,
        0,
        0,
        0,
        0
      ),
      doctorId: this.authService.getUserId()
    }).subscribe((res: any) => {
      this.location.back();
    },
      err => console.log(err)
    );
  }

  async associatePatient() {
    const alert = await this.alertController.create({
      header: 'Are you sure you want to associate this existent patient?',
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
            this.http.post('/doctors/' + this.authService.getUserId() + '/patients/' + this.patient.id, {}).subscribe((res: any) => {
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
