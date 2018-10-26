import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'parent-assignments', loadChildren: './parent-assignments/parent-assignments.module#ParentAssignmentsPageModule' },
  { path: 'create-session', loadChildren: './create-session/create-session.module#CreateSessionPageModule' },
  { path: 'doctors', loadChildren: './doctors/doctors.module#DoctorsPageModule' },
  { path: 'opinion', loadChildren: './opinion/opinion.module#OpinionPageModule' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParentRoutingModule { }
