import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpService } from '../../../services/http.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DateService } from '../../../services/date.service';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-create-session',
  templateUrl: './create-session.page.html',
  styleUrls: ['./create-session.page.scss'],
})
export class CreateSessionPage implements OnInit {

  createSessionForm: FormGroup;
  assignmentId: any;

  constructor(private location: Location,
    private http: HttpService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private dateService: DateService,
    private alertController: AlertController,
    private toastController: ToastController,
    private authService: AuthenticationService) {
    this.initCreateSessionForm();
  }

  initCreateSessionForm() {
    this.createSessionForm = this.formBuilder.group({
      date: ['', Validators.required],
      parentNotes: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.assignmentId = params['assignmentId'];
    });
  }

  createSession() {
    this.http.post('/sessions', {
      date: this.dateService.ionDateTimeDateToUTC(this.createSessionForm.value['date']),
      parentNotes: this.createSessionForm.value['parentNotes'],
      parentId: this.authService.getUserId(),
      assignmentId: this.assignmentId
    }).subscribe((res: any) => {
      this.presentToast();
      this.navigateAfterSessionCreated(res.id);
    },
      err => console.log(err)
    );
  }

  async navigateAfterSessionCreated(sessionId: any) {
    const alert = await this.alertController.create({
      header: '¿Desea añadir alguna imagen o vídeo a la sesión?',
      buttons: [
        {
          text: 'Más tarde',
          role: 'cancel',
          cssClass: 'cancel',
          handler: () => {
            this.location.back();
          }
        }, {
          text: 'Sí',
          handler: () => {
            this.router.navigate(['private', 'shared', 'session', sessionId,
              { segment: 'multimedia', shouldPerformExtraLocationBack: true }
            ], { replaceUrl: true });
          }
        }
      ]
    });

    await alert.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'La sesión ha sido creada.',
      cssClass: 'success',
      duration: 3000
    });
    toast.present();
  }

}
