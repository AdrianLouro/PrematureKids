import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'parent-assignments', loadChildren: './parent-assignments/parent-assignments.module#ParentAssignmentsPageModule' },
  { path: 'parent-profile', loadChildren: './parent-profile/parent-profile.module#ParentProfilePageModule' },
  { path: 'create-child', loadChildren: './create-child/create-child.module#CreateChildPageModule' },
  { path: 'parent-assignments', loadChildren: './parent-assignments/parent-assignments.module#ParentAssignmentsPageModule' },
  { path: 'create-session', loadChildren: './create-session/create-session.module#CreateSessionPageModule' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParentRoutingModule { }
