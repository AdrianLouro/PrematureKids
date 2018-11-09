import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'categories', loadChildren: './categories/categories.module#CategoriesPageModule' },
  { path: 'doctors', loadChildren: './doctors/doctors.module#DoctorsPageModule' },
  {
    path: 'administrator-profile',
    loadChildren: './administrator-profile/administrator-profile.module#AdministratorProfilePageModule'
  },
  { path: 'category/:id', loadChildren: './category/category.module#CategoryPageModule' },
  { path: 'create-category', loadChildren: './create-category/create-category.module#CreateCategoryPageModule' },
  { path: 'create-doctor', loadChildren: './create-doctor/create-doctor.module#CreateDoctorPageModule' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministratorRoutingModule { }
