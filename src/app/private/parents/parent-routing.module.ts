import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'parent-dashboard', loadChildren: './parent-dashboard/parent-dashboard.module#ParentDashboardPageModule' },
  { path: 'parent-profile', loadChildren: './parent-profile/parent-profile.module#ParentProfilePageModule' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParentRoutingModule { }
