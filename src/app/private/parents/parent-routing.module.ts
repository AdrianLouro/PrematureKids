import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'parent-assignments', loadChildren: './parent-assignments/parent-assignments.module#ParentAssignmentsPageModule' },
  { path: 'create-session', loadChildren: './create-session/create-session.module#CreateSessionPageModule' },
  // { path: 'parent-doctors', loadChildren: './parent-doctors/parent-doctors.module#ParentDoctorsPageModule' },
  { path: 'children', loadChildren: './children/children.module#ChildrenPageModule' },
  { path: 'parent-profile/:id', loadChildren: './parent-profile/parent-profile.module#ParentProfilePageModule' },
  { path: 'opinion', loadChildren: './opinion/opinion.module#OpinionPageModule' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParentRoutingModule { }
