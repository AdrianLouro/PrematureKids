import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'chats', loadChildren: './chats/chats.module#ChatsPageModule' },
  { path: 'chat', loadChildren: './chat/chat.module#ChatPageModule' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
