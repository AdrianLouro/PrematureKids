import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ParentDoctorsPage } from './parent-doctors.page';

const routes: Routes = [
  {
    path: '',
    component: ParentDoctorsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ParentDoctorsPage]
})
export class ParentDoctorsPageModule {}
