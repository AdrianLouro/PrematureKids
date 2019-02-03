import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../../../services/http.service';
import { AuthenticationService } from '../../../services/authentication/authentication.service';

@Component({
  selector: 'app-opinion',
  templateUrl: './opinion.page.html',
  styleUrls: ['./opinion.page.scss'],
})
export class OpinionPage implements OnInit {

  opinion: any;
  opinionForm: FormGroup;
  exerciseId: any;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpService,
    private authService: AuthenticationService,
    private toastController: ToastController,
    private alertController: AlertController) {
    this.initOpinionForm();
  }

  initOpinionForm() {
    this.opinionForm = this.formBuilder.group({
      text: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.exerciseId = params['exerciseId'];
      this.loadOpinion();
    });
  }

  loadOpinion() {
    this.http.get('/opinions?exerciseId=' + this.exerciseId + '&parentId=' + this.authService.getUserId()).subscribe((res: any) => {
      this.opinion = res[0];
      if (this.opinion !== undefined) {
        this.setOpinion();
      }
    },
      err => console.log(err)
    );
  }

  setOpinion() {
    this.opinionForm.setValue({
      text: this.opinion.text
    });
  }

  saveOpinion() {
    this.opinion == null ? this.createOpinion() : this.editOpinion();
  }

  createOpinion() {
    this.http.post('/opinions', {
      text: this.opinionForm.value['text'],
      exerciseId: this.exerciseId,
      parentId: this.authService.getUserId()
    }).subscribe((res: any) => {
      this.opinion = res;
      this.presentToast();
    },
      err => console.log(err)
    );
  }

  editOpinion() {
    this.http.put('/opinions/' + this.opinion.id, {
      text: this.opinionForm.value['text'],
      exerciseId: this.exerciseId,
      parentId: this.authService.getUserId()
    }).subscribe((res: any) => {
      this.presentToast();
    },
      err => console.log(err)
    );
  }

  removeOpinion() {
    this.presentConfirmationAlert();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Su opinión ha sido ' + (this.opinion !== undefined ? 'enviada' : 'eliminada') + ' correctamente.',
      cssClass: 'success',
      duration: 3000
    });
    toast.present();
  }

  async presentConfirmationAlert() {
    const alert = await this.alertController.create({
      header: '¿Está seguro de que quiere eliminar la opinión?',
      message: '¡Se borrará permanentemente!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'cancel',
          handler: () => {
          }
        }, {
          text: 'Eliminar opinión',
          cssClass: 'danger',
          handler: () => {
            this.http.delete('/opinions/' + this.opinion.id).subscribe((res: any) => {
              this.opinion = undefined;
              this.opinionForm.reset();
              this.presentToast();
            },
              err => console.log(err)
            );
          }
        }
      ]
    });

    await alert.present();
  }

}
