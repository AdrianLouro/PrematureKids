import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpService } from '../../../services/http.service';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
      this.location.back();
    },
      err => console.log(err)
    );
  }
}
