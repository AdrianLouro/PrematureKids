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
      newPassword: [''],
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
    this.http.put('/users/' + this.authService.getUserId(), this.editAccountForm.value).subscribe((res: any) => {
      this.editAccountForm.controls['newPassword'].reset();
      this.presentToast();
      this.invalidPassword = false;
    },
      err => this.invalidPassword = true
    );
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your account has been edited.',
      cssClass: 'primary',
      showCloseButton: true,
      closeButtonText: 'OK'
    });
    toast.present();
  }

}
