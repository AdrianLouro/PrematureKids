import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { HttpService } from '../../services/http.service';
import { ToastController } from '@ionic/angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-register-parent',
  templateUrl: './register-parent.page.html',
  styleUrls: ['./register-parent.page.scss'],
})
export class RegisterParentPage implements OnInit {

  private registerParentForm: FormGroup;
  private passwordsFormGroup: FormGroup;

  constructor(private authService: AuthenticationService,
    private http: HttpService,
    private toastController: ToastController,
    private location: Location,
    private formBuilder: FormBuilder) {
    this.initRegisterParentForm();
  }

  ngOnInit() {
  }

  initRegisterParentForm() {
    this.passwordsFormGroup = this.formBuilder.group({
      password: ['', Validators.required],
      passwordConfirmation: ['', Validators.required]
    },
      { validator: PasswordsValidator.validate.bind(this) }
    );

    this.registerParentForm = this.formBuilder.group({
      name: ['', Validators.required],
      idNumber: ['', Validators.required],
      telephone: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      acceptTerms: [false, Validators.requiredTrue],
      passwordsFormGroup: this.passwordsFormGroup,
    });
  }

  registerParent() {
    this.http.post('/parents', {

      'name': this.registerParentForm.value['name'],
      'idNumber': this.registerParentForm.value['idNumber'],
      'telephone': this.registerParentForm.value['telephone'],
      'email': this.registerParentForm.value['email'],
      'password': this.passwordsFormGroup.value['password']

    }).subscribe((res: any) => {
      this.presentToast();
      this.location.back();
    },
      err => console.log('ERROR: ' + err)
    );
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your account has been created.',
      cssClass: 'primary',
      showCloseButton: true,
      closeButtonText: 'OK'
    });
    toast.present();
  }

}

export class PasswordsValidator {
  static validate(passwordsFormGroup: FormGroup) {
    return passwordsFormGroup.controls.passwordConfirmation.value === passwordsFormGroup.controls.password.value ?
      null : { doesNotMatchPassword: true };
  }
}
