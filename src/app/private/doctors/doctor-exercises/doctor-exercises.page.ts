import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../../services/http.service';
import { AuthenticationService } from '../../../services/authentication/authentication.service';

@Component({
  selector: 'app-doctor-exercises',
  templateUrl: './doctor-exercises.page.html',
  styleUrls: ['./doctor-exercises.page.scss'],
})
export class DoctorExercisesPage implements OnInit {

  exercises: any[];
  categories: any[];

  constructor(private router: Router,
    private http: HttpService,
    private authService: AuthenticationService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadExercises();
    this.loadCategories();
  }

  loadExercises() {
    this.http.get('/doctors/' + this.authService.getUserId() + '/exercises').subscribe((res: any) => {
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
