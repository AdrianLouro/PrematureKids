import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {

  contacts: any[];

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.loadContacts();
  }

  loadContacts() {
    this.contacts = [1, 2, 3];
  }

  createNewChat() {
    // TODO: evitar push en el historial de navegación
    this.router.navigate(['private', 'shared', 'chat'], { replaceUrl: true });
  }

}
