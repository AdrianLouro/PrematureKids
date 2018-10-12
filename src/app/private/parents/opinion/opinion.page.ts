import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-opinion',
  templateUrl: './opinion.page.html',
  styleUrls: ['./opinion.page.scss'],
})
export class OpinionPage implements OnInit {

  opinion: any;
  opinionForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private location: Location,
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
  }

  saveOpinion() {
    this.opinion == null ? this.createOpinion() : this.editOpinion();
  }

  createOpinion() {
    console.log("creando");
    this.opinion = {};
    this.presentToast();
  }

  editOpinion() {
    console.log("editando");
    this.presentToast();
  }

  removeOpinion() {
    this.presentConfirmationAlert();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your opinion has been sent.',
      cssClass: 'primary',
      showCloseButton: true,
      closeButtonText: 'OK'
    });
    toast.present();
  }

  async presentConfirmationAlert() {
    const alert = await this.alertController.create({
      header: 'Are you sure you want to delete your opinion?',
      message: 'It will be permanently deleted!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'danger',
          handler: () => {
          }
        }, {
          text: 'Delete opinion',
          handler: () => {
            this.location.back();
          }
        }
      ]
    });

    await alert.present();
  }

}
