import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../../services/http.service';

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
    private http: HttpService,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService) {
    this.authenticatedAsParent = this.authService.isAuthenticatedAs('parent');
    this.initEditParentForm();
    this.makeEditParentFormReadonlyIfNotParent();
  }

  initEditParentForm() {
    this.editParentForm = this.formBuilder.group({
      name: ['', Validators.required],
      idNumber: ['', Validators.required],
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
    this.http.get('/parents/' + this.authService.getUserId()).subscribe((res: any) => {
      this.editParentForm.setValue({
        name: res.name,
        idNumber: res.idNumber,
        telephone: res.telephone,
      });
    },
      err => console.log(err));
  }

  editProfile() {
    this.http.put('/parents/' + this.authService.getUserId(), this.editParentForm.value).subscribe((res: any) => {
      this.presentToast();
    },
      err => console.log(err));
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
