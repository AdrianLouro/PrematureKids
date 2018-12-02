import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { StreamingMedia } from '@ionic-native/streaming-media/ngx';
import { Camera } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.page.html',
  styleUrls: ['./exercise.page.scss'],
})
export class ExercisePage implements OnInit {

  iAmAuthor: boolean;
  segment = 'info';
  opinions: any[];
  exercise: any;
  exerciseVideo: any;
  exerciseImages: any[];
  editExerciseForm: FormGroup;
  categories: any[];

  constructor(private route: ActivatedRoute,
    private http: HttpService,
    private location: Location,
    private formBuilder: FormBuilder,
    private streamingMedia: StreamingMedia,
    private photoViewer: PhotoViewer,
    private camera: Camera,
    private alertController: AlertController,
    private toastController: ToastController,
    private authService: AuthenticationService) {
    this.initEditExerciseForm();
  }

  initEditExerciseForm() {
    this.editExerciseForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.http.get('/categories').subscribe((res: any) => {
      this.categories = res;
      this.loadExerciseWithOpinions();
    },
      err => console.log(err)
    );
  }

  loadExerciseWithOpinions() {
    this.route.params.subscribe(params => {
      this.loadExercise(params['id']);
      this.loadExerciseMedia(params['id']);
      this.loadOpinionsOfExercise(params['id']);
    });
  }

  loadExercise(id: any) {
    this.http.get('/exercises/' + id).subscribe((res: any) => {
      this.exercise = res;
      this.iAmAuthor = this.authService.getUserId() === this.exercise.doctor.id;
      this.setExercise();
    },
      err => console.log(err)
    );
  }

  setExercise() {
    this.editExerciseForm.setValue({
      title: this.exercise.title,
      description: this.exercise.description,
      category: this.exercise.category.id
    });
  }

  loadExerciseMedia(exerciseId: any) {
    this.loadExerciseVideo(exerciseId);
    this.loadExerciseImages(exerciseId);
  }

  loadExerciseVideo(exerciseId: any) {
    this.http.get('/exercises/' + exerciseId + '/videos').subscribe((res: any) => {
      this.exerciseVideo = res[0];
    },
      err => console.log(err)
    );
  }

  loadExerciseImages(exerciseId: any) {
    this.http.get('/exercises/' + exerciseId + '/images').subscribe((res: any) => {
      this.exerciseImages = res;
    },
      err => console.log(err)
    );
  }

  loadOpinionsOfExercise(id: any) {
    this.http.get('/exercises/' + id + '/opinions').subscribe((res: any) => {
      this.opinions = res;
    },
      err => console.log(err)
    );
  }

  editExercise() {
    this.http.put('/exercises/' + this.exercise.id, {
      title: this.editExerciseForm.value['title'],
      description: this.editExerciseForm.value['description'],
      categoryId: this.editExerciseForm.value['category'],
      doctorId: this.authService.getUserId()
    }).subscribe((res: any) => {
      this.presentToast();
    },
      err => console.log(err)
    );
  }

  getAndUploadVideo() {
    this.camera.getPicture(
      {
        quality: 100,
        destinationType: this.camera.DestinationType.FILE_URI,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
      }
    ).then(
      (videoURI) => this.uploadVideo(videoURI),
      err => { console.log(err); this.uploadVideo(''); } // TODO: borrar uploadVideo('')
    );
  }

  uploadVideo(videoURI) {
    this.http.post('/exercisesAttachments', {
      'name': Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8),
      'type': 'video',
      'exerciseId': this.exercise.id
    }).subscribe((res: any) => {
      this.exerciseVideo = res;
    },
      err => console.log(err)
    );
  }

  async deleteVideo() {
    const alert = await this.alertController.create({
      header: 'Are you sure you want to delete the video?',
      message: 'It will be permanently deleted!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'danger',
          handler: () => {
          }
        }, {
          text: 'Delete video',
          handler: () => {
            this.http.delete('/exercisesAttachments/' + this.exerciseVideo.id).subscribe((res: any) => {
              this.exerciseVideo = undefined;
            },
              err => console.log(err)
            );
          }
        }
      ]
    });

    await alert.present();
  }

  getAndUploadImage() {
    this.camera.getPicture(
      {
        quality: 100,
        destinationType: this.camera.DestinationType.FILE_URI,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
      }
    ).then(
      (imageURI) => this.uploadImage(imageURI),
      err => { console.log(err); this.uploadImage(''); } // TODO: borrar uploadImage('')
    );
  }

  uploadImage(imageURI) {
    this.http.post('/exercisesAttachments', {
      'name': Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8),
      'type': 'image',
      'exerciseId': this.exercise.id
    }).subscribe((res: any) => {
      this.exerciseImages.push(res);
    },
      err => console.log(err)
    );
  }

  async deleteImage(image) {
    const alert = await this.alertController.create({
      header: 'Are you sure you want to delete the image?',
      message: 'It will be permanently deleted!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'danger',
          handler: () => {
          }
        }, {
          text: 'Delete image',
          handler: () => {
            this.http.delete('/exercisesAttachments/' + image.id).subscribe((res: any) => {
              this.exerciseImages = this.exerciseImages.filter(exerciseImage => exerciseImage.id !== image.id);
            },
              err => console.log(err)
            );
          }
        }
      ]
    });

    await alert.present();
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

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'The exercise has been edited.',
      cssClass: 'primary',
      showCloseButton: true,
      closeButtonText: 'OK'
    });
    toast.present();
  }

  removeExercise() {
    this.presentConfirmationAlert();
  }

  async presentConfirmationAlert() {
    const alert = await this.alertController.create({
      header: 'Are you sure you want to delete the exercise?',
      message: 'It will be permanently deleted!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'danger',
          handler: () => {
          }
        }, {
          text: 'Delete exercise',
          handler: () => {
            this.http.delete('/exercises/' + this.exercise.id).subscribe((res: any) => {
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
