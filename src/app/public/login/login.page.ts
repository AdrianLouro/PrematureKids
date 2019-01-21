import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private loginForm: FormGroup;
  private invalidCredentials = false;

  constructor(private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private http: HttpService) {
    this.initLoginForm();
  }

  ngOnInit() {
  }

  initLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['p@p', [Validators.email, Validators.required]],
      password: ['password', Validators.required]
    });
  }

  login() {
    this.http.post('/login', this.loginForm.value).subscribe((res: any) => {
      this.loginForm.reset();
      this.invalidCredentials = false;
      this.authService.loginWithToken(res.token);
    },
      err => {
        this.invalidCredentials = err.status === 401;
        if (err.status === 403) { this.presentBlockedUserAlert(); }
      }
    );
  }

  async presentBlockedUserAlert() {
    const alert = await this.alertController.create({
      message: 'La cuenta ha sido bloqueada por el administrador.',
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });

    await alert.present();
  }

}
