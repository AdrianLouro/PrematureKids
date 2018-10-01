import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ParentAssignmentsPage } from './parent-assignments.page';

const routes: Routes = [
  {
    path: '',
    component: ParentAssignmentsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ParentAssignmentsPage]
})
export class ParentAssignmentsPageModule {}
