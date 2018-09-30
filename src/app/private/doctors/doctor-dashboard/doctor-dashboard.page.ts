import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication/authentication.service';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.page.html',
  styleUrls: ['./doctor-dashboard.page.scss'],
})
export class DoctorDashboardPage implements OnInit {

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }

}
