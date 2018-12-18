import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { HttpService } from '../../../services/http.service';
import { ToastController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  editCategoryForm: FormGroup;
  categoryId: any;
  nameAlreadyRegistered = false;

  constructor(private http: HttpService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private alertController: AlertController,
    private toastController: ToastController) {
    this.initEditCategoryForm();
  }

  initEditCategoryForm() {
    this.editCategoryForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.categoryId = params['id'];
      this.loadCategory();
    });
  }

  loadCategory() {
    this.http.get('/categories/' + this.categoryId).subscribe((res: any) => {
      this.editCategoryForm.setValue({
        name: res.name
      });
    },
      err => console.log(err));
  }

  editCategory() {
    this.http.put('/categories/' + this.categoryId, this.editCategoryForm.value).subscribe((res: any) => {
      this.nameAlreadyRegistered = false;
      this.presentToast();
    },
      err => {
        if (err.status === 409) { this.nameAlreadyRegistered = true; }
      }
    );
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'The category has been edited.',
      cssClass: 'primary',
      duration: 3000
    });
    toast.present();
  }

  removeCategory() {
    this.presentConfirmationAlert();
  }

  async presentConfirmationAlert() {
    const alert = await this.alertController.create({
      header: 'Are you sure you want to delete the category?',
      message: 'It will be permanently deleted!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'danger',
          handler: () => {
          }
        }, {
          text: 'Delete category',
          handler: () => {
            this.http.delete('/categories/' + this.categoryId).subscribe((res: any) => {
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
