import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'parents', loadChildren: './parents/parents.module#ParentsPageModule' },
  { path: 'patients', loadChildren: './patients/patients.module#PatientsPageModule' },
  { path: 'create-assignment', loadChildren: './create-assignment/create-assignment.module#CreateAssignmentPageModule' },
  { path: 'add-patient', loadChildren: './add-patient/add-patient.module#AddPatientPageModule' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
