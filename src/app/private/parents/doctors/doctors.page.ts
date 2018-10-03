import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.page.html',
  styleUrls: ['./doctors.page.scss'],
})
export class DoctorsPage implements OnInit {

  doctors: any[];

  constructor(private router: Router) { }

  ngOnInit() {
    this.loadDoctors();
  }

  loadDoctors(): any {
    this.doctors = [1, 2];
  }

  navigateToDoctor() {
    this.router.navigate(['private', 'shared', 'doctor-profile']);
  }

}
