import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'parent-assignments', loadChildren: './parent-assignments/parent-assignments.module#ParentAssignmentsPageModule' },
  { path: 'create-child', loadChildren: './create-child/create-child.module#CreateChildPageModule' },
  { path: 'parent-assignments', loadChildren: './parent-assignments/parent-assignments.module#ParentAssignmentsPageModule' },
  { path: 'create-session', loadChildren: './create-session/create-session.module#CreateSessionPageModule' },
  { path: 'doctors', loadChildren: './doctors/doctors.module#DoctorsPageModule' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParentRoutingModule { }
