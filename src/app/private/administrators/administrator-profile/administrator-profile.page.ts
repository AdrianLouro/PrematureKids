import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-administrator-profile',
  templateUrl: './administrator-profile.page.html',
  styleUrls: ['./administrator-profile.page.scss'],
})
export class AdministratorProfilePage implements OnInit {

  editAdministratorForm: FormGroup;

  constructor(private http: HttpService,
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private authService: AuthenticationService) {
    this.initEditAdministratorForm();
  }

  initEditAdministratorForm() {
    this.editAdministratorForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.loadAdministratorProfile();
  }

  loadAdministratorProfile() {
    this.http.get('/administrators/' + this.authService.getUserId()).subscribe((res: any) => {
      this.editAdministratorForm.setValue({
        name: res.name
      });
    },
      err => console.log(err));
  }

  editProfile() {
    this.http.put('/administrators/' + this.authService.getUserId(), this.editAdministratorForm.value).subscribe((res: any) => {
      this.presentToast();
    },
      err => console.log(err)
    );
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

}
