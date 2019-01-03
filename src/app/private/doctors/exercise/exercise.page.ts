import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { StreamingMedia } from '@ionic-native/streaming-media/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';

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
    private fileTransfer: FileTransfer,
    private alertController: AlertController,
    private toastController: ToastController,
    private loadingController: LoadingController,
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
      this.presentToast('El ejercicio ha sido editado.');
    },
      err => console.log(err)
    );
  }

  getAndUploadVideo() {
    this.camera.getPicture(
      {
        quality: 100,
        destinationType: this.camera.DestinationType.NATIVE_URI,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        mediaType: this.camera.MediaType.VIDEO
      }
    ).then(
      (videoURI) => this.uploadFile(videoURI, 'video'),
      err => { console.log(err); this.uploadFile('', ''); } // TODO: borrar uploadFile('')
    );
  }

  async deleteVideo() {
    const alert = await this.alertController.create({
      header: '¿Está seguro de que quiere eliminar el video?',
      message: '¡Se borrará permanentemente!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'danger',
          handler: () => {
          }
        }, {
          text: 'Eliminar vídeo',
          handler: () => {
            this.http.delete('/exercisesAttachments/' + this.exerciseVideo.id).subscribe((res: any) => {
              this.presentToast('El vídeo ha sido eliminado.');
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
        destinationType: this.camera.DestinationType.NATIVE_URI,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        mediaType: this.camera.MediaType.PICTURE
      }
    ).then(
      (imageURI) => this.uploadFile(imageURI, 'image'),
      err => { console.log(err); this.uploadFile('', ''); } // TODO: borrar uploadFile('')
    );
  }

  async deleteImage(image) {
    const alert = await this.alertController.create({
      header: '¿Está seguro de que quiere eliminar la imagen?',
      message: '¡Se borrará permanentemente!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'danger',
          handler: () => {
          }
        }, {
          text: 'Eliminar imagen',
          handler: () => {
            this.http.delete('/exercisesAttachments/' + image.id).subscribe((res: any) => {
              this.presentToast('La imagen ha sido eliminada.');
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

  async uploadFile(fileURI, type) {
    const loadingController = await this.loadingController.create({
      message: 'Subiendo archivo'
    });

    await loadingController.present();

    this.fileTransfer.create().upload(fileURI, 'http://192.168.1.10:5000/exercisesAttachments',
      {
        fileKey: 'file',
        fileName: fileURI.split('/').pop(),
        chunkedMode: false,
        mimeType: type + '/*',
        params: {
          'name': fileURI.split('/').pop(),
          'type': type,
          'exerciseId': this.exercise.id,
        }
      }).then(res => {
        loadingController.dismiss();
        type === 'video' ? this.exerciseVideo = JSON.parse(res.response) : this.exerciseImages.push(JSON.parse(res.response));
        this.presentToast('Se ha subido el archivo.');
      }).catch(err => {
        console.log(err);
        loadingController.dismiss();
      });
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

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      cssClass: 'primary',
      duration: 3000
    });
    toast.present();
  }

  removeExercise() {
    this.presentConfirmationAlert();
  }

  async presentConfirmationAlert() {
    const alert = await this.alertController.create({
      header: '¿Está seguro de que quiere eliminar el ejercicio?',
      message: '¡Se borrará permanentemente!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'danger',
          handler: () => {
          }
        }, {
          text: 'Eliminar ejercicio',
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
