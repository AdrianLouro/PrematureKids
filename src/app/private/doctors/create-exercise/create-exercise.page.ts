import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpService } from '../../../services/http.service';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-exercise',
  templateUrl: './create-exercise.page.html',
  styleUrls: ['./create-exercise.page.scss'],
})
export class CreateExercisePage implements OnInit {

  createExerciseForm: FormGroup;
  categories: any[];

  constructor(private location: Location,
    private http: HttpService,
    private formBuilder: FormBuilder,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController,
    private authService: AuthenticationService) {
    this.initCreateExerciseForm();
  }

  initCreateExerciseForm(): any {
    this.createExerciseForm = this.formBuilder.group({
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
    },
      err => console.log(err)
    );
  }

  createExercise() {
    this.http.post('/exercises', {
      title: this.createExerciseForm.value['title'],
      description: this.createExerciseForm.value['description'],
      categoryId: this.createExerciseForm.value['category'],
      doctorId: this.authService.getUserId()
    }).subscribe((res: any) => {
      this.presentToast();
      this.navigateAfterExerciseCreated(res.id);
    },
      err => console.log(err)
    );
  }

  async navigateAfterExerciseCreated(exerciseId: any) {
    const alert = await this.alertController.create({
      header: '¿Desea añadir alguna imagen o vídeo al ejercicio?',
      buttons: [
        {
          text: 'Más tarde',
          role: 'cancel',
          cssClass: 'danger',
          handler: () => {
            this.location.back();
          }
        }, {
          text: 'Sí',
          handler: () => {
            this.router.navigate(['private', 'doctors', 'exercise', exerciseId,
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
      message: 'El ejercicio ha sido creado.',
      cssClass: 'primary',
      duration: 3000
    });
    toast.present();
  }

}
