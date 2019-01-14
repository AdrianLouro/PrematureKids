import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  // { path: 'parents', loadChildren: './parents/parents.module#ParentsPageModule' },
  { path: 'patients', loadChildren: './patients/patients.module#PatientsPageModule' },
  { path: 'create-assignment', loadChildren: './create-assignment/create-assignment.module#CreateAssignmentPageModule' },
  { path: 'add-patient', loadChildren: './add-patient/add-patient.module#AddPatientPageModule' },
  // { path: 'doctor-exercises', loadChildren: './doctor-exercises/doctor-exercises.module#DoctorExercisesPageModule' },
  { path: 'exercise/:id', loadChildren: './exercise/exercise.module#ExercisePageModule' },
  { path: 'exercises', loadChildren: './exercises/exercises.module#ExercisesPageModule' },
  { path: 'add-parent', loadChildren: './add-parent/add-parent.module#AddParentPageModule' },
  { path: 'create-exercise', loadChildren: './create-exercise/create-exercise.module#CreateExercisePageModule' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
