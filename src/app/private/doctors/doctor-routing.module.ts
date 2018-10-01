import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'doctor-dashboard', loadChildren: './doctor-dashboard/doctor-dashboard.module#DoctorDashboardPageModule' },
  { path: 'doctor-profile', loadChildren: './doctor-profile/doctor-profile.module#DoctorProfilePageModule' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
