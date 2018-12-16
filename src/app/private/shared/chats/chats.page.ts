import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { FirebaseChatService } from '../../../services/firebase-chat.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {

  chats: any[];
  authenticatedAsParent: boolean;

  constructor(private router: Router,
    private authService: AuthenticationService,
    private firebaseChatService: FirebaseChatService) {
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.authenticatedAsParent = this.authService.isAuthenticatedAs('parent');
    this.loadChats();
  }

  loadChats() {
    this.firebaseChatService.loadChats(this);
  }

  openChat(id: any) {
    this.router.navigate(['private', 'shared', 'chat', id]);
  }

  navigateToContacts() {
    this.router.navigate(['private', 'shared', 'contacts']);
  }

}
