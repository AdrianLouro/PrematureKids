import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-add-parent',
  templateUrl: './add-parent.page.html',
  styleUrls: ['./add-parent.page.scss'],
})
export class AddParentPage implements OnInit {

  parent: any;

  constructor(private location: Location,
    private alertController: AlertController) { }

  ngOnInit() {
  }

  searchParent(event: any) {
    this.parent = event.target.value.length === 9 ? 1 : undefined;
  }

  addParent() {
    this.presentConfirmationAlert();
  }

  async presentConfirmationAlert() {
    const alert = await this.alertController.create({
      header: 'Are you sure you want to associate this parent?',
      // message: 'It will be permanently deleted!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'danger',
          handler: () => {
          }
        }, {
          text: 'Associate parent',
          handler: () => {
            this.location.back();
          }
        }
      ]
    });

    await alert.present();
  }

}
