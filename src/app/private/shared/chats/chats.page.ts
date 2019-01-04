import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { FirebaseChatService } from '../../../services/firebase-chat.service';
import * as firebase from 'Firebase';
import { HttpService } from '../../../services/http.service';

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
    private http: HttpService,
    private firebaseChatService: FirebaseChatService) {
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.authenticatedAsParent = this.authService.isAuthenticatedAs('parent');
    this.http.get('/users/' + this.authService.getUserId() + '/firebaseToken').subscribe((token: string) => {
      firebase.auth().signInWithCustomToken(token).then(res => {
        this.loadChats();
      }).catch(err => console.log(err));
    }, err => console.log(err)
    );
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
