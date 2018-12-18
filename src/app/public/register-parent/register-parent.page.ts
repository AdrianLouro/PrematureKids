import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { HttpService } from '../../services/http.service';
import { ToastController } from '@ionic/angular';
import { Location } from '@angular/common';
import { FirebaseChatService } from '../../services/firebase-chat.service';

@Component({
  selector: 'app-register-parent',
  templateUrl: './register-parent.page.html',
  styleUrls: ['./register-parent.page.scss'],
})
export class RegisterParentPage implements OnInit {

  private registerParentForm: FormGroup;
  private passwordsFormGroup: FormGroup;
  emailAlreadyRegistered = false;
  idNumberAlreadyRegistered = false;

  constructor(private authService: AuthenticationService,
    private http: HttpService,
    private firebaseChatService: FirebaseChatService,
    private toastController: ToastController,
    private location: Location,
    private formBuilder: FormBuilder) {
    this.initRegisterParentForm();
  }

  ngOnInit() {
  }

  initRegisterParentForm() {
    this.passwordsFormGroup = this.formBuilder.group({
      password: ['', Validators.minLength(8)],
      passwordConfirmation: ['', Validators.minLength(8)]
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
      this.firebaseChatService.createUser(res.id, res.name, 'parent');
      this.presentToast();
      this.location.back();
    },
      err => {
        if (err.status === 409) {
          this.emailAlreadyRegistered = err.error === 'email';
          this.idNumberAlreadyRegistered = err.error === 'idNumber';
        }
      }
    );
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your account has been created.',
      cssClass: 'primary',
      duration: 3000
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
