import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'chats', loadChildren: './chats/chats.module#ChatsPageModule' },
  { path: 'chat', loadChildren: './chat/chat.module#ChatPageModule' },
  { path: 'contacts', loadChildren: './contacts/contacts.module#ContactsPageModule' },
  { path: 'children', loadChildren: './children/children.module#ChildrenPageModule' },
  { path: 'child', loadChildren: './child/child.module#ChildPageModule' },
  { path: 'assignment', loadChildren: './assignment/assignment.module#AssignmentPageModule' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
