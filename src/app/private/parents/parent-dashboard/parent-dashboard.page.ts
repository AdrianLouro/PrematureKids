import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication/authentication.service';

@Component({
  selector: 'app-parent-dashboard',
  templateUrl: './parent-dashboard.page.html',
  styleUrls: ['./parent-dashboard.page.scss'],
})
export class ParentDashboardPage implements OnInit {

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
  }

  // logout() {
  //   this.authService.logout();
  // }

}
