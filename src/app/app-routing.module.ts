import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/authentication/auth-guard.service';
import { DoctorAuthGuardService } from './services/authentication/doctor-auth-guard.service';
import { ParentAuthGuardService } from './services/authentication/parent-auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './public/home/home.module#HomePageModule' },
  { path: 'login', loadChildren: './public/login/login.module#LoginPageModule' },
  { path: 'register-parent', loadChildren: './public/register-parent/register-parent.module#RegisterParentPageModule' },
  { path: 'register-doctor', loadChildren: './public/register-doctor/register-doctor.module#RegisterDoctorPageModule' },
  {
    path: 'private/shared',
    canActivate: [AuthGuardService],
    loadChildren: './private/shared/shared-routing.module#SharedRoutingModule'
  },
  {
    path: 'private/doctors',
    canActivate: [DoctorAuthGuardService],
    loadChildren: './private/doctors/doctor-routing.module#DoctorRoutingModule'
  },
  {
    path: 'private/parents',
    canActivate: [ParentAuthGuardService],
    loadChildren: './private/parents/parent-routing.module#ParentRoutingModule'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
