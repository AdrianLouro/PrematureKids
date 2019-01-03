import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';

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
      err => this.invalidCredentials = true
    );
  }

}
