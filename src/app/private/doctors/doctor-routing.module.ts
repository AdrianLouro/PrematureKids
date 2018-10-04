import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'parents', loadChildren: './parents/parents.module#ParentsPageModule' },
  { path: 'add-parent', loadChildren: './add-parent/add-parent.module#AddParentPageModule' },
  { path: 'patients', loadChildren: './patients/patients.module#PatientsPageModule' },
  { path: 'create-assignment', loadChildren: './create-assignment/create-assignment.module#CreateAssignmentPageModule' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
