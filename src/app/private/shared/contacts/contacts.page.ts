import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { HttpService } from '../../../services/http.service';
import { FirebaseChatService } from '../../../services/firebase-chat.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {

  contacts: any[];
  authenticatedAsParent: boolean;
  selectedContact: any;

  constructor(private router: Router,
    private http: HttpService,
    private firebaseChatService: FirebaseChatService,
    private authService: AuthenticationService) {
    this.authenticatedAsParent = this.authService.isAuthenticatedAs('parent');
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadContacts();
  }

  loadContacts() {
    this.http.get('/' +
      (this.authenticatedAsParent ? 'parents' : 'doctors')
      + '/' + this.authService.getUserId() + '/' +
      (this.authenticatedAsParent ? 'doctors' : 'parents')
    ).subscribe((res: any) => {
      this.contacts = res;
    },
      err => console.log(err)
    );
  }

  openChatWith(id: any) {
    this.selectedContact = id;
    this.firebaseChatService.searchChatWith(id, this);
  }

  chatFound(chat: any[]) {
    if (chat.length === 0) {
      this.firebaseChatService.createChatWithUsers(
        this.authenticatedAsParent ? this.selectedContact : this.authService.getUserId(),
        this.authenticatedAsParent ? this.authService.getUserId() : this.selectedContact,
        this
      );
    } else {
      this.navigateToChat(chat[0].key);
    }
  }

  chatCreated(key: any) {
    this.navigateToChat(key);
  }

  navigateToChat(id: any) {
    // TODO: evitar push en el historial de navegación
    this.router.navigate(['private', 'shared', 'chat', id], { replaceUrl: true });
  }

}
