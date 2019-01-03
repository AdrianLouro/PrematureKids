import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'chats', loadChildren: './chats/chats.module#ChatsPageModule' },
  { path: 'chat/:id', loadChildren: './chat/chat.module#ChatPageModule' },
  { path: 'contacts', loadChildren: './contacts/contacts.module#ContactsPageModule' },
  { path: 'child/:id', loadChildren: './child/child.module#ChildPageModule' },
  { path: 'assignment/:id', loadChildren: './assignment/assignment.module#AssignmentPageModule' },
  { path: 'session/:id', loadChildren: './session/session.module#SessionPageModule' },
  { path: 'doctor-profile/:id', loadChildren: './doctor-profile/doctor-profile.module#DoctorProfilePageModule' },
  { path: 'account', loadChildren: './account/account.module#AccountPageModule' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
