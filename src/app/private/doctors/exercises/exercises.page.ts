import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../../services/http.service';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.page.html',
  styleUrls: ['./exercises.page.scss'],
})
export class ExercisesPage implements OnInit {

  exercises: any[];
  categories: any[];

  constructor(private router: Router,
    private http: HttpService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadExercises();
    this.loadCategories();
  }

  loadExercises() {
    this.http.get('/exercises').subscribe((res: any) => {
      this.exercises = res;
    },
      err => console.log(err)
    );
  }

  loadCategories() {
    this.http.get('/categories').subscribe((res: any) => {
      this.categories = res;
    },
      err => console.log(err)
    );
  }

  navigateToExercise(id: any) {
    this.router.navigate(['private', 'doctors', 'exercise', id]);
  }

}
