import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication/authentication.service';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.page.html',
  styleUrls: ['./assignment.page.scss'],
})
export class AssignmentPage implements OnInit {

  authenticatedAsParent = false;
  segment = 'info';
  sessions: any[];

  constructor(private router: Router,
    private authService: AuthenticationService) {
    this.authenticatedAsParent = this.authService.isAuthenticatedAs('parent');
  }

  ngOnInit() {
    this.loadSessions();
  }

  loadSessions(): any {
    this.sessions = [1, 2, 3];
  }

  navigateToSession() {
    this.router.navigate(['private', 'shared', 'session']);
  }

  navigateToCreateSession() {
    this.router.navigate(['private', 'parents', 'create-session']);
  }

}
