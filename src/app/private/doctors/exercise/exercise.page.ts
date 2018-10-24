import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.page.html',
  styleUrls: ['./exercise.page.scss'],
})
export class ExercisePage implements OnInit {

  segment = 'info';
  opinions: any[];

  constructor() { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadOpinions();
  }

  loadOpinions() {
    this.opinions = [1, 2, 3];
  }

}
