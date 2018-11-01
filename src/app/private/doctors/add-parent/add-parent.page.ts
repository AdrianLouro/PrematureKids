import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../../../services/http.service';

@Component({
  selector: 'app-add-parent',
  templateUrl: './add-parent.page.html',
  styleUrls: ['./add-parent.page.scss'],
})
export class AddParentPage implements OnInit {

  parent: any;
  childId: any;

  constructor(private location: Location,
    private route: ActivatedRoute,
    private http: HttpService,
    private alertController: AlertController) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.childId = params['childId'];
    });
  }

  searchParent(event: any) {
    if (event.target.value.length !== 9) {
      this.parent = undefined;
      return;
    }

    this.http.get('/parents?idNumber=' + event.target.value).subscribe((res: any) => {
      this.parent = res[0];
    },
      err => console.log(err)
    );
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
            this.http.post('/children/' + this.childId + '/parents/' + this.parent.id, {}).subscribe((res: any) => {
              this.location.back();
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