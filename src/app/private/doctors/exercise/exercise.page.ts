import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';

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
  editExerciseForm: FormGroup;
  categories: any[];

  constructor(private route: ActivatedRoute,
    private http: HttpService,
    private location: Location,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private toastController: ToastController,
    private authService: AuthenticationService) {
    this.initEditExerciseForm();
  }

  initEditExerciseForm() {
    this.editExerciseForm = this.formBuilder.group({
      title: ['', Validators.required],
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
      category: this.exercise.category.id
    });
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
      categoryId: this.editExerciseForm.value['category'],
      doctorId: this.authService.getUserId()
    }).subscribe((res: any) => {
      this.presentToast();
    },
      err => console.log(err)
    );
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
