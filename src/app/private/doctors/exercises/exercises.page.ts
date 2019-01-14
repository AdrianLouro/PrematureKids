import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../../services/http.service';
import { AuthenticationService } from '../../../services/authentication/authentication.service';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.page.html',
  styleUrls: ['./exercises.page.scss'],
})
export class ExercisesPage implements OnInit {

  exercises: any[];
  categories: any[];
  segment = 'all';
  userId: any;

  constructor(private router: Router,
    private authService: AuthenticationService,
    private http: HttpService) {
    this.userId = authService.getUserId();
  }

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

  navigateToCreateExercise() {
    this.router.navigate(['private', 'doctors', 'create-exercise']);
  }

}
