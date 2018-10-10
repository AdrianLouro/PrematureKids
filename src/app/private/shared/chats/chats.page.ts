import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication/authentication.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {

  chats: any[];
  authenticatedAsParent: boolean;

  constructor(private router: Router,
    private authService: AuthenticationService) {
    this.authenticatedAsParent = this.authService.isAuthenticatedAs('parent');
  }

  ngOnInit() {
    this.loadChats();
  }

  loadChats() {
    this.chats = [1, 2, 3, 4, 5];
  }

  filterChats(event: any) {
    this.chats = Array.from(Array(Math.max(0, 5 - event.target.value.length)).keys());
  }

  openChat() {
    this.router.navigate(['private', 'shared', 'chat']);
  }

  navigateToContacts() {
    this.router.navigate(['private', 'shared', 'contacts']);
  }

}
