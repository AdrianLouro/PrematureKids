import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DoctorExercisesPage } from './doctor-exercises.page';

const routes: Routes = [
  {
    path: '',
    component: DoctorExercisesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DoctorExercisesPage]
})
export class DoctorExercisesPageModule {}
