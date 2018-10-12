import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.page.html',
  styleUrls: ['./exercises.page.scss'],
})
export class ExercisesPage implements OnInit {

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

}
