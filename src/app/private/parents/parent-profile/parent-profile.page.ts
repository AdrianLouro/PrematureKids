import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../../services/http.service';
import { FirebaseChatService } from '../../../services/firebase-chat.service';

@Component({
  selector: 'app-parent-profile',
  templateUrl: './parent-profile.page.html',
  styleUrls: ['./parent-profile.page.scss'],
})
export class ParentProfilePage implements OnInit {

  editParentForm: FormGroup;
  authenticatedAsParent = false;
  parentId: string;
  idNumberAlreadyRegistered = false;

  constructor(private toastController: ToastController,
    private router: Router,
    private http: HttpService,
    private firebaseChatService: FirebaseChatService,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private route: ActivatedRoute) {
    this.authenticatedAsParent = this.authService.isAuthenticatedAs('parent');
    this.initEditParentForm();
  }

  initEditParentForm() {
    this.editParentForm = this.formBuilder.group({
      name: ['', Validators.required],
      idNumber: ['', Validators.required],
      telephone: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.route.params.subscribe(params => {
      this.parentId = params['id'];
      this.loadParentProfile();
    });
  }

  loadParentProfile() {
    this.http.get('/parents/' + this.parentId).subscribe((res: any) => {
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
      this.idNumberAlreadyRegistered = false;
      this.firebaseChatService.editUser(this.authService.getUserId(), this.editParentForm.value['name']);
      this.presentToast();
    },
      err => {
        if (err.status === 409) { this.idNumberAlreadyRegistered = true; }
      }
    );
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'El perfil ha sido editado correctamente.',
      cssClass: 'success',
      duration: 3000
    });
    toast.present();
  }

  openChat() {
    this.router.navigate(['private', 'shared', 'chat']);
  }

}
