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
  userIsBlocked = false;

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
      if (this.authenticatedUserRole === 'administrator') {
        this.loadDoctorAccountStatus();
      }
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
      err => console.log(err)
    );
  }

  loadDoctorAccountStatus() {
    this.http.get('/users/' + this.doctorId).subscribe((res: any) => {
      this.userIsBlocked = res.blocked;
    },
      err => console.log(err)
    );
  }

  editProfile() {
    this.http.put('/doctors/' + this.doctorId, this.editDoctorForm.value).subscribe((res: any) => {
      this.boardNumberAlreadyRegistered = false;
      this.firebaseChatService.editUser(this.doctorId, this.editDoctorForm.value['name']);
      this.presentToast(this.authenticatedUserRole === 'doctor' ? 'Su perfil ha sido editado.' : 'El perfil del doctor ha sido editado.');
    },
      err => {
        if (err.status === 409) { this.boardNumberAlreadyRegistered = true; }
      }
    );
  }

  async editDoctorBlockStatus() {
    const alert = await this.alertController.create({
      header: '¿Está seguro de que quiere ' + (this.userIsBlocked ? 'desbloquear' : 'bloquear') + ' la cuenta de usuario del doctor?',
      message: '¡El doctor ' + (this.userIsBlocked ? 'ahora' : 'no') + ' podrá iniciar sesión en la aplicación!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'danger',
          handler: () => {
          }
        }, {
          text: this.userIsBlocked ? 'Desbloquear' : 'Bloquear',
          handler: () => {
            this.http.put('/users/' + this.doctorId + '/status', { blocked: !this.userIsBlocked }).subscribe((res: any) => {
              this.presentToast('La cuenta del doctor ha sido ' + (this.userIsBlocked ? 'desbloqueada' : 'bloqueada') + '.');
              this.userIsBlocked = !this.userIsBlocked;
            },
              err => console.log(err)
            );
          }
        }
      ]
    });

    await alert.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      cssClass: 'primary',
      duration: 3000
    });
    toast.present();
  }

  async removeDoctor() {
    const alert = await this.alertController.create({
      header: '¿Está seguro de que quiere eliminar a este doctor?',
      message: '¡Se borrará permanentemente!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'danger',
          handler: () => {
          }
        }, {
          text: 'Eliminar doctor',
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
