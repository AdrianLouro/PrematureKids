import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../../services/http.service';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  editAccountForm: FormGroup;
  invalidPassword = false;
  emailAlreadyRegistered = false;

  constructor(private http: HttpService,
    private authService: AuthenticationService,
    private toastController: ToastController,
    private formBuilder: FormBuilder) {
    this.initEditAccountForm();
  }

  initEditAccountForm() {
    this.editAccountForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.minLength(8)],
    });
  }

  ngOnInit() {
    this.loadAccount();
  }

  loadAccount() {
    this.http.get('/users/' + this.authService.getUserId()).subscribe((res: any) => {
      this.editAccountForm.controls['email'].setValue(res.email);
    },
      err => console.log(err));
  }

  editAccount() {
    this.http.put('/users/' + this.authService.getUserId(), {
      email: this.editAccountForm.value['email'],
      currentPassword: this.editAccountForm.value['currentPassword'],
      newPassword: this.editAccountForm.value['newPassword'] ? this.editAccountForm.value['newPassword'] : null
    }).subscribe((res: any) => {
      this.editAccountForm.controls['newPassword'].reset();
      this.presentToast();
      this.invalidPassword = false;
      this.emailAlreadyRegistered = false;
    },
      err => {
        if (err.status === 401) { this.invalidPassword = true; }
        if (err.status === 409) { this.emailAlreadyRegistered = true; }
      }
    );
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'La cuenta ha sido editada.',
      cssClass: 'success',
      duration: 3000
    });
    toast.present();
  }

}
