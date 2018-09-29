import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private loginForm: FormGroup;

  constructor(private authService: AuthenticationService, private formBuilder: FormBuilder) {
    this.initLoginForm();
  }

  ngOnInit() {
  }

  initLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['email@email.es', Validators.email],
      password: ['', Validators.required]
    });
    console.log(this.loginForm);
  }

  // login() {
  //   this.authService.login();
  // }

  login() {
    this.authService.loginWithToken(this.loginForm.value['password']);
  }

}
