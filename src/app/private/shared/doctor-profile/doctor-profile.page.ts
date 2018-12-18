import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../../services/http.service';
import { Location } from '@angular/common';
import { FirebaseChatService } from '../../../services/firebase-chat.service';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.page.html',
  styleUrls: ['./doctor-profile.page.scss'],
})
export class DoctorProfilePage implements OnInit {

  editDoctorForm: FormGroup;
  authenticatedUserRole: string;
  doctorId: string;
  boardNumberAlreadyRegistered = false;

  constructor(private toastController: ToastController,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private http: HttpService,
    private firebaseChatService: FirebaseChatService,
    private router: Router,
    private location: Location,
    private alertController: AlertController,
    private route: ActivatedRoute) {
    this.authenticatedUserRole = this.authService.getDecodedToken().role;
    this.initEditDoctorForm();
  }

  initEditDoctorForm() {
    this.editDoctorForm = this.formBuilder.group({
      name: ['', Validators.required],
      boardNumber: ['', Validators.required],
      telephone: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.route.params.subscribe(params => {
      this.doctorId = params['id'];
      this.loadDoctorProfile();
    });
  }

  loadDoctorProfile() {
    this.http.get('/doctors/' + this.doctorId).subscribe((res: any) => {
      this.editDoctorForm.setValue({
        name: res.name,
        boardNumber: res.boardNumber,
        telephone: res.telephone,
      });
    },
      err => console.log(err));
  }

  editProfile() {
    this.http.put('/doctors/' + this.doctorId, this.editDoctorForm.value).subscribe((res: any) => {
      this.boardNumberAlreadyRegistered = false;
      this.firebaseChatService.editUser(this.doctorId, this.editDoctorForm.value['name']);
      this.presentToast();
    },
      err => {
        if (err.status === 409) { this.boardNumberAlreadyRegistered = true; }
      }
    );
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: this.authenticatedUserRole === 'doctor' ? 'Your profile has been edited.' : 'The doctor profile has been edited.',
      cssClass: 'primary',
      duration: 3000
    });
    toast.present();
  }

  async removeDoctor() {
    const alert = await this.alertController.create({
      header: 'Are you sure you want to delete this doctor?',
      message: 'It will be permanently deleted!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'danger',
          handler: () => {
          }
        }, {
          text: 'Delete doctor',
          handler: () => {
            this.http.delete('/doctors/' + this.doctorId).subscribe((res: any) => {
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

  openChat() {
    this.router.navigate(['private', 'shared', 'chat']);
  }

}
