import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication/authentication.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {

  contacts: any[];
  authenticatedAsParent: boolean;

  constructor(private router: Router,
    private authService: AuthenticationService) {
    this.authenticatedAsParent = this.authService.isAuthenticatedAs('parent');
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadContacts();
  }

  loadContacts() {
    this.contacts = [1, 2, 3, 4, 5];
  }

  filterContacts(event: any) {
    this.contacts = Array.from(Array(Math.max(0, 5 - event.target.value.length)).keys());
  }

  createNewChat() {
    // TODO: evitar push en el historial de navegación
    this.router.navigate(['private', 'shared', 'chat'], { replaceUrl: true });
  }

}
