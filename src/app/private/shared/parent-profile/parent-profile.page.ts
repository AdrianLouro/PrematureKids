import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-parent-profile',
  templateUrl: './parent-profile.page.html',
  styleUrls: ['./parent-profile.page.scss'],
})
export class ParentProfilePage implements OnInit {

  editParentForm: FormGroup;
  authenticatedAsParent = false;

  constructor(private toastController: ToastController,
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService) {
    this.authenticatedAsParent = this.authService.isAuthenticatedAs('parent');
    this.initEditParentForm();
    this.makeEditParentFormReadonlyIfNotParent();
  }

  initEditParentForm() {
    this.editParentForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      id: ['', Validators.required],
      telephone: ['', Validators.required],
    });
  }

  makeEditParentFormReadonlyIfNotParent() {
    if (!this.authenticatedAsParent) {
      this.editParentForm.disable();
    }
  }

  ngOnInit() {
    this.loadParentProfile();
  }

  loadParentProfile() {
    this.editParentForm.setValue({
      fullName: 'John Doe',
      id: '42895827X',
      telephone: '636782109',
    });
  }

  editProfile() {
    this.presentToast();
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

  openChat() {
    this.router.navigate(['private', 'shared', 'chat']);
  }

}