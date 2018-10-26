import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { Router } from '@angular/router';
import { HttpService } from '../../../services/http.service';

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
    private http: HttpService,
    private router: Router
  ) {
    this.authenticatedAsParent = this.authService.isAuthenticatedAs('parent');
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadChildren();
  }

  loadChildren() {
    this.http.get('/parents/' + this.authService.getUserId() + '/children').subscribe((res: any) => {
      this.children = res;
    },
      err => console.log(err)
    );
  }

  navigateToChild(id: any) {
    this.router.navigate(['private', 'shared', 'child', id]);
  }

}
