import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-exercises',
  templateUrl: './doctor-exercises.page.html',
  styleUrls: ['./doctor-exercises.page.scss'],
})
export class DoctorExercisesPage implements OnInit {

  exercises: any[];
  categories: any[];

  constructor(private router: Router) { }

  ngOnInit() {
    this.loadExercises();
    this.loadCategories();
  }

  loadExercises() {
    this.exercises = [1, 2, 3, 4, 5];
  }

  loadCategories() {
    this.categories = [1, 2, 3, 4];
  }

  filterExercises(event: any) {
    this.exercises = Array.from(Array(Math.max(0, 5 - event.target.value.length)).keys());
  }

  navigateToExercise() {
    this.router.navigate(['private', 'doctors', 'exercise']);
  }

  navigateToCreateExercise() {
    this.router.navigate(['private', 'doctors', 'create-exercise']);
  }

}
