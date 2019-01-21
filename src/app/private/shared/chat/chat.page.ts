import { Component, OnInit, ViewChild } from '@angular/core';
import { FirebaseChatService } from '../../../services/firebase-chat.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { IonContent } from '@ionic/angular';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  @ViewChild('content') content: IonContent;
  authenticatedAsParent: boolean;
  chat: any;
  messages: any[];
  newMessage: string;

  constructor(private firebaseChatService: FirebaseChatService,
    private location: Location,
    private authService: AuthenticationService,
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

  performExtraLocationBack() { // TODO: delete when Angular router is fixed
    this.location.back();
  }

  loadChat(id: any) {
    this.firebaseChatService.loadChatById(id, this);
  }

  loadMessages(id: any) {
    this.firebaseChatService.loadMessagesForChat(id, this);
  }

  sendMessage() {
    this.firebaseChatService.sendMessage(this.newMessage, this.chat.key, this);
    this.newMessage = undefined;
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.content.scrollToBottom) {
        this.content.scrollToBottom();
      }
    }, 50);
  }

  imSenderOf(message: any) {
    return message.sender === this.authService.getUserId();
  }

}
