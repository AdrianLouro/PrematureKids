import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { Location } from '@angular/common';
import { AlertController, ToastController } from '@ionic/angular';
import { HttpService } from '../../../services/http.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DateService } from '../../../services/date.service';
import { StreamingMedia } from '@ionic-native/streaming-media/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.page.html',
  styleUrls: ['./assignment.page.scss'],
})
export class AssignmentPage implements OnInit {

  authenticatedAsParent = false;
  iAmAuthor = false;
  segment = 'info';
  assignment: any;
  exerciseVideo: any;
  exerciseImages: any[];
  sessions: any[];
  editAssignmentForm: FormGroup;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private location: Location,
    private http: HttpService,
    private dateService: DateService,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private toastController: ToastController,
    private streamingMedia: StreamingMedia,
    private photoViewer: PhotoViewer,
    private authService: AuthenticationService) {
    this.authenticatedAsParent = this.authService.isAuthenticatedAs('parent');
    this.initEditAssignmentForm();
  }

  initEditAssignmentForm() {
    this.editAssignmentForm = this.formBuilder.group({
      doctorId: ['', Validators.required],
      date: ['', Validators.required],
      notes: ['', Validators.required],
      exerciseFrequency: ['', Validators.required],
      exerciseDuration: ['', Validators.required],
      feedbackFrequency: ['', Validators.required],
      state: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.route.params.subscribe(params => {
      this.loadAssignment(params['id']);
      this.loadSessions(params['id']);
    });
  }

  loadAssignment(assignmentId: any) {
    this.http.get('/assignments/' + assignmentId).subscribe((res: any) => {
      this.assignment = res;
      this.iAmAuthor = !this.authenticatedAsParent && this.assignment.doctor.id === this.authService.getUserId();
      this.setAssignment();
      this.loadExerciseMedia();
    },
      err => console.log(err)
    );
  }

  loadExerciseMedia() {
    this.loadExerciseVideo();
    this.loadExerciseImages();
  }

  loadExerciseVideo() {
    this.http.get('/exercises/' + this.assignment.exercise.id + '/videos').subscribe((res: any) => {
      this.exerciseVideo = res[0];
    },
      err => console.log(err)
    );
  }

  loadExerciseImages() {
    this.http.get('/exercises/' + this.assignment.exercise.id + '/images').subscribe((res: any) => {
      this.exerciseImages = res;
    },
      err => console.log(err)
    );
  }

  setAssignment() {
    this.editAssignmentForm.setValue({
      doctorId: this.assignment.doctor.id,
      date: this.dateService.apiDateTimeToIonDateTimeStringDate(this.assignment.date),
      notes: this.assignment.notes,
      exerciseFrequency: this.assignment.exerciseFrequency,
      exerciseDuration: this.assignment.exerciseDuration,
      feedbackFrequency: this.assignment.feedbackFrequency,
      state: this.assignment.state
    });
  }

  loadSessions(assignmentId: any) {
    this.http.get('/assignments/' + assignmentId + '/sessions').subscribe((res: any) => {
      this.sessions = res;
    },
      err => console.log(err)
    );
  }

  editAssignment() {
    this.http.put('/assignments/' + this.assignment.id, this.editAssignmentForm.value).subscribe((res: any) => {
      this.presentToast();
    },
      err => console.log(err)
    );
  }

  playVideo() {
    this.streamingMedia.playVideo(
      this.exerciseVideo.fullPath,
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
    this.photoViewer.show(image.fullPath, '', { share: false });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'La tarea ha sido editada.',
      cssClass: 'primary',
      duration: 3000
    });
    toast.present();
  }

  removeAssignment() {
    this.presentConfirmationAlert();
  }

  async presentConfirmationAlert() {
    const alert = await this.alertController.create({
      header: '¿Está seguro de que quiere eliminar la tarea?',
      message: '¡Se borrará permanentemente!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'danger',
          handler: () => {
          }
        }, {
          text: 'Eliminar tarea',
          handler: () => {
            this.http.delete('/assignments/' + this.assignment.id).subscribe((res: any) => {
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

  navigateToSession(id: any) {
    this.router.navigate(['private', 'shared', 'session', id, { iAmAssignmentAuthor: this.iAmAuthor }]);
  }

  navigateToCreateSession() {
    this.router.navigate(['private', 'parents', 'create-session', { assignmentId: this.assignment.id }]);
  }

  navigateToOpinion() {
    this.router.navigate(['private', 'parents', 'opinion', { exerciseId: this.assignment.exercise.id }]);
  }

}
