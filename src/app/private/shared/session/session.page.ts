import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { ToastController, AlertController } from '@ionic/angular';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../../../services/http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateService } from '../../../services/date.service';
import { StreamingMedia } from '@ionic-native/streaming-media/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

@Component({
  selector: 'app-session',
  templateUrl: './session.page.html',
  styleUrls: ['./session.page.scss'],
})
export class SessionPage implements OnInit {

  session: any;
  sessionVideo: any;
  sessionImages: any[];
  segment = 'info';
  iAmAuthor = false;
  iAmAssignmentAuthor = false;
  authenticatedAsParent = false;
  editSessionForm: FormGroup;

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private streamingMedia: StreamingMedia,
    private photoViewer: PhotoViewer,
    private route: ActivatedRoute,
    private http: HttpService,
    private location: Location,
    private formBuilder: FormBuilder,
    private dateService: DateService,
    private authService: AuthenticationService) {
    this.authenticatedAsParent = this.authService.isAuthenticatedAs('parent');
    this.initEditSessionForm();
  }

  initEditSessionForm() {
    this.editSessionForm = this.formBuilder.group({
      date: ['', Validators.required],
      parentNotes: ['', Validators.required],
      doctorNotes: [''],
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.route.params.subscribe(params => {
      this.loadSession(params['id']);
      this.loadSessionMedia(params['id']);
      this.iAmAssignmentAuthor = JSON.parse(params['iAmAssignmentAuthor']);
    });
  }

  loadSession(id: any) {
    this.http.get('/sessions/' + id).subscribe((res: any) => {
      this.session = res;
      this.iAmAuthor = this.authenticatedAsParent && this.session.parent.id === this.authService.getUserId();
      this.setEditSessionForm();
    },
      err => console.log(err)
    );
  }

  setEditSessionForm() {
    this.editSessionForm.setValue({
      date: this.dateService.apiDateTimeToIonDateTimeStringDate(this.session.date),
      parentNotes: this.session.parentNotes,
      doctorNotes: this.session.doctorNotes
    });
  }

  loadSessionMedia(sessionId: any) {
    this.loadSessionVideo(sessionId);
    this.loadSessionImages(sessionId);
  }

  loadSessionVideo(sessionId: any) {
    this.http.get('/sessions/' + sessionId + '/videos').subscribe((res: any) => {
      this.sessionVideo = res[0];
    },
      err => console.log(err)
    );
  }

  loadSessionImages(sessionId: any) {
    this.http.get('/sessions/' + sessionId + '/images').subscribe((res: any) => {
      this.sessionImages = res;
    },
      err => console.log(err)
    );
  }

  editSession() {
    this.http.put('/sessions/' + this.session.id, {
      date: this.dateService.ionDateTimeDateToUTC(this.editSessionForm.value['date']),
      parentNotes: this.editSessionForm.value['parentNotes'],
      doctorNotes: this.editSessionForm.value['doctorNotes']
    }).subscribe((res: any) => {
      this.presentToast();
    },
      err => console.log(err)
    );
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'The session has been edited.',
      cssClass: 'primary',
      showCloseButton: true,
      closeButtonText: 'OK'
    });
    toast.present();
  }

  playVideo() {
    this.streamingMedia.playVideo(
      'http://techslides.com/demos/sample-videos/small.mp4',
      {
        successCallback: () => { console.log('Playing video'); },
        errorCallback: () => { console.log('Video could not be played'); },
        // orientation: 'landscape',
        shouldAutoClose: false,
        controls: true
      }
    );
  }

  showImage(image) {
    this.photoViewer.show('http://i.imgur.com/I86rTVl.jpg', '', { share: false });
  }

  removeSession() {
    this.presentConfirmationAlert();
  }

  async presentConfirmationAlert() {
    const alert = await this.alertController.create({
      header: 'Are you sure you want to delete the session?',
      message: 'It will be permanently deleted!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'danger',
          handler: () => {
          }
        }, {
          text: 'Delete session',
          handler: () => {
            this.http.delete('/sessions/' + this.session.id).subscribe((res: any) => {
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
