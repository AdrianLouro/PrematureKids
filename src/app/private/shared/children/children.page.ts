import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-children',
  templateUrl: './children.page.html',
  styleUrls: ['./children.page.scss'],
})
export class ChildrenPage implements OnInit {

  children: any[];
  authenticatedAsParent = false;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.authenticatedAsParent = this.authService.isAuthenticatedAs('parent');
  }

  ngOnInit() {
    this.loadChildren();
  }

  loadChildren() {
    this.children = [1, 2];
  }

  navigateToCreateChild() {
    this.router.navigate(['private', 'parents', 'create-child']);
  }

  navigateToChild() {
    this.router.navigate(['private', 'shared', 'child']);
  }

}
