import { Injectable } from '@angular/core';
import * as firebase from 'Firebase';
import { AuthenticationService } from './authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseChatService {

  private users = firebase.database().ref('users');
  private chats = firebase.database().ref('chats');
  private messages = firebase.database().ref('messages');
  private authenticatedAsParent: boolean;

  constructor(private authService: AuthenticationService) {
  }

  createUser(id, name, role) {
    this.users.child(id).set({
      name: name,
      role: role
    });
  }

  editUser(id, name) {
    this.users.child(id).update({
      name: name
    });
  }

  loadChats(chatsLoader) {
    this.authenticatedAsParent = this.authService.isAuthenticatedAs('parent');
    this.chats.orderByChild(this.authenticatedAsParent ? 'parent' : 'doctor').equalTo(this.authService.getUserId()).once('value', res => {
      const chats = snapshotToArray(res);
      chats.forEach(chat => {
        this.users.child(this.authenticatedAsParent ? chat.doctor : chat.parent).once('value', user => {
          chat.name = user.toJSON()['name'];
        });
        // this.messages.orderByChild('chat').equalTo(chat.key).orderByChild('timestamp').limitToLast(1).once('value', message => {
        //   console.log('CHAT KEY ' + chat.key);
        //   chat.lastMessage = message.toJSON();
        //   console.log(message.toJSON());
        // });
      });
      chatsLoader.chats = chats;
    });
  }

  loadChatById(chatId, chatLoader) {
    this.chats.child(chatId).once('value', chat => {
      chatLoader.chat = chat.val();
      chatLoader.chat.key = chat.key;
      this.users.child(this.authenticatedAsParent ? chatLoader.chat.doctor : chatLoader.chat.parent).once('value', user => {
        chatLoader.chat.name = user.toJSON()['name'];
      });
    });
  }

  searchChatWith(id, chatLoader) {
    this.authenticatedAsParent = this.authService.isAuthenticatedAs('parent');
    this.chats.orderByChild(this.authenticatedAsParent ? 'parent' : 'doctor').equalTo(this.authService.getUserId()).once('value', res => {
      chatLoader.chatFound(
        snapshotToArray(res).filter(chat =>
          this.authenticatedAsParent ? chat.doctor === id : chat.parent === id
        )
      );
    });
  }

  loadMessagesForChat(chatId, messageLoader) {
    this.messages.orderByChild('chat').equalTo(chatId).on('value', messages => {
      messageLoader.messages = snapshotToArray(messages);
      messageLoader.scrollToBottom();
    });
  }

  createChatWithUsers(doctor: any, parent: any, chatCreator: any) {
    this.chats.push({
      'doctor': doctor,
      'parent': parent
    }).then(chat => chatCreator.chatCreated(chat.key));
  }

  sendMessage(message: any, chatId, messageLoader) {
    this.messages.push({
      chat: chatId,
      sender: this.authService.getUserId(),
      text: message,
      timestamp: new Date().getTime()
    }).then(() => messageLoader.scrollToBottom());
  }

}

export const snapshotToArray = snapshot => {
  const array = [];
  snapshot.forEach(childSnapshot => {
    const item = childSnapshot.val();
    item.key = childSnapshot.key;
    array.push(item);
  });

  return array;
};
