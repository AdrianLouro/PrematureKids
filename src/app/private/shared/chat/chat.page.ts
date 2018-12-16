import { Component, OnInit } from '@angular/core';
import { FirebaseChatService } from '../../../services/firebase-chat.service';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  authenticatedAsParent: boolean;
  chat: any;
  messages: any[];
  newMessage: string;

  constructor(private authService: AuthenticationService,
    private firebaseChatService: FirebaseChatService,
    private route: ActivatedRoute) {

  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.route.params.subscribe(params => {
      this.loadChat(params['id']);
      this.loadMessages(params['id']);
    });
  }

  loadChat(id: any) {
    this.firebaseChatService.loadChatById(id, this);
  }

  loadMessages(id: any) {
    this.firebaseChatService.loadMessagesForChat(id, this);
  }

  sendMessage() {
    this.firebaseChatService.sendMessage(this.newMessage, this.chat.key);
    this.newMessage = undefined;
  }

}
