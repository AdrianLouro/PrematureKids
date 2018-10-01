import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {

  chats: any[];

  constructor(private router: Router) { }

  ngOnInit() {
    this.loadChats();
  }

  loadChats() {
    this.chats = [1, 2, 3, 4, 5];
  }

  openChat() {
    this.router.navigate(['private', 'shared', 'chat']);
  }

}
