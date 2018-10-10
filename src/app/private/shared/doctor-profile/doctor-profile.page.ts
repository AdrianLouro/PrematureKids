import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
    private router: Router) {
    this.authenticatedAsDoctor = this.authService.isAuthenticatedAs('doctor');
    this.initEditDoctorForm();
    this.makeEditDoctorFormReadonlyIfNotDoctor();
  }

  initEditDoctorForm() {
    this.editDoctorForm = this.formBuilder.group({
      fullName: ['', Validators.required],
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
    this.editDoctorForm.setValue({
      fullName: 'John Doe',
      boardNumber: '353529748',
      telephone: '645987412',
    });
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

  openChat() {
    this.router.navigate(['private', 'shared', 'chat']);
  }

}
