import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../../services/http.service';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.page.html',
  styleUrls: ['./doctor-profile.page.scss'],
})
export class DoctorProfilePage implements OnInit {

  editDoctorForm: FormGroup;
  authenticatedAsDoctor = false;

  constructor(private toastController: ToastController,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private http: HttpService,
    private router: Router) {
    this.authenticatedAsDoctor = this.authService.isAuthenticatedAs('doctor');
    this.initEditDoctorForm();
    this.makeEditDoctorFormReadonlyIfNotDoctor();
  }

  initEditDoctorForm() {
    this.editDoctorForm = this.formBuilder.group({
      name: ['', Validators.required],
      boardNumber: ['', Validators.required],
      telephone: ['', Validators.required],
    });
  }

  makeEditDoctorFormReadonlyIfNotDoctor() {
    if (!this.authenticatedAsDoctor) {
      this.editDoctorForm.disable();
    }
  }

  ngOnInit() {
    this.loadDoctorProfile();
  }

  loadDoctorProfile() {
    this.http.get('/doctors/' + this.authService.getUserId()).subscribe((res: any) => {
      this.editDoctorForm.setValue({
        name: res.name,
        boardNumber: res.boardNumber,
        telephone: res.telephone,
      });
    },
      err => console.log(err));
  }

  editProfile() {
    this.http.put('/doctors/' + this.authService.getUserId(), this.editDoctorForm.value).subscribe((res: any) => {
      this.presentToast();
    },
      err => console.log(err));
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
